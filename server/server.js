const express = require('express');
const session = require('express-session');
const app = express();
const port = 3001;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const fs = require('fs');
const multer = require('multer');
const cors = require('cors');

const connection = mysql.createConnection({
    host     : 'localhost',
    port     : '8889',
    user     : 'root',
    password : 'root',
    database : 'promomoria'
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('uploads'));


app.use(session({secret: 'ssshhhhh'}));

let sess;

app.post('/',function(req,res){
    sess = req.session;
    console.log(sess)
    //Session set when user Request our app via URL
    if(sess.user_id) {
        connection.query(
            `SELECT id, label_name FROM users WHERE id = '${sess.user_id}'`, 
            function (error, results, fields) { 
                res.send({
                    success: true,
                    user_id: results[0].id,
                    label_name: results[0].label_name
                });              
            }
        );
    }
});

app.post('/log_out',function(req,res){
    console.log("session")
    req.session.destroy();
    res.send(true)
});

// Create new user.
app.post('/add_user', (req, res) => {
    // New user data.
    const password = req.body.password;
    const email = req.body.email;
    const labelName = req.body.label_name;
    // Hashing the password. 
    const hashedPassword = bcrypt.hashSync(password, 10);
    // Check if e-mail already is registered.
    connection.query(
        `SELECT * FROM users WHERE email = '${email}'`,
        function (error, results) { 
            if (!results.length) {
                // If email doesnt exist, add user to database.
                connection.query(
                    `insert into users(password,email,label_name) values('${hashedPassword}','${email}','${labelName}')`, 
                    function (error, results) { 
                        if (results) {
                            res.send({
                                success: true,
                                message: ''
                            });
                        } else if (error) {
                            res.send({
                                success: false,
                                message: 'Something went wrong, please try again!'
                            });
                        }
                    }
                );             
            } else if (results.length > 0) {
                // If email already exists.
                res.send({
                    success: false,
                    message: 'This e-mail address is already existing!'
                });
            } else if (error) {
                // General errors.
                res.send({
                    success: false,
                    message: 'Something went wrong, please try again!'
                });
            }
        }
    );
});

// Login user.
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    connection.query(
        `SELECT id, label_name, password FROM users WHERE email = '${email}'`, 
        function (error, results, fields) { 
            if (results) {
                bcrypt.compare(password, results[0].password, function (err, result) {
                    if (result === true) {

                        /* TEST */
                        
                        sess = req.session;
                        sess.user_id=results[0].id;

                        /* ----- */


                        // Set session here??
                        res.send({
                            success: true,
                            user_id: results[0].id,
                            label_name: results[0].label_name
                        });
                    } else {
                        res.send({
                            success: false,
                            message: 'Your password is not correct'
                        });
                    }
                });              
            } else {
                res.send({
                    success: false,
                    message: 'Your e-mail or password is not correct'
                });
            }
        }
    );
});

// Fetch all releases for logged in user.
app.post('/fetch_releases', (req, res) => {
    const userId = req.body.userId
    connection.query(
        `SELECT * FROM releases WHERE user_id = '${userId}' ORDER BY id DESC`,    
        (error, results, fields) => { 
            res.send(results)
        }
    );
});

// Fetch all feedback.
app.post('/fetch_feedback', (req, res) => {
    const releaseId = req.body.release_id;
    connection.query(
        `SELECT * FROM feedback WHERE release_id = '${releaseId}'`,    
        (error, results, fields) => { 
            res.send(results)
        }
    );
});

// Update status release.
app.post('/status_release', (req, res) => {
    const releaseId = req.body.release_id;
    const status = req.body.release_status;
    connection.query(
        `UPDATE releases SET activated = '${status}' WHERE releases . id = '${releaseId}'`,    
        (error, results, fields) => { 
            console.log(results)
            console.log(error)
        }
    );
});

// Delete release and the files related to release.
app.post('/delete_release', (req, res) => {
    const releaseId = req.body.release_id;

    connection.query(
        `SELECT track_file FROM tracks WHERE release_id = '${releaseId}'`, 
        function (error, results, fields) { 
            results.map(track => {
                fs.unlink(`uploads/tracks/${track.track_file}`);
            })
        }
    );
    connection.query(
        `SELECT image_file FROM artwork WHERE release_id = '${releaseId}'`, 
        function (error, results, fields) { 
            results.map(artwork=> {
                fs.unlink(`uploads/artwork/${artwork.image_file}`);
            })
        }
    );

    connection.query(
        `DELETE FROM releases WHERE releases.id = '${releaseId}'`,    
        (error, results, fields) => {          
            connection.query(
                `DELETE FROM tracks WHERE release_id = '${releaseId}'`, 
                function (error, results, fields) { 
          
                }
            );
            connection.query(
                `DELETE FROM artwork WHERE release_id = '${releaseId}'`, 
                function (error, results, fields) { 
          
                }
            );
        }
    );
});

// Fetch release
app.post('/fetch_release', (req, res) => {
  const releaseId = req.body.release_id;
  connection.query(
    `SELECT 
        * FROM releases 
    JOIN
        artwork ON release_id =
        '${releaseId}'
    WHERE id = '${releaseId}'`,    
    function (error, results, fields) { 
        res.send(results)
    }
  );
});

// Fetch release
app.post('/fetch_label', (req, res) => {
    const userId = req.body.user_id;
    connection.query(
      `SELECT 
          * FROM users 
      WHERE id = '${userId}'`,    
      function (error, results, fields) { 
          res.send(results)
      }
    );
  });

// Fetch tracks
/* Merge this with function above */
app.post('/fetch_release_tracks', (req, res) => {
    const releaseId = req.body.release_id;
    connection.query(`SELECT * FROM tracks WHERE release_id = '${releaseId}'`,    
        function (error, results, fields) { 
            res.send(results)
        }
    );
});

// Add feedback
app.post('/add_feedback', (req, res) => {
    const feedbackData = req.body;
    connection.query(
        `insert into feedback(release_id,artist_name,feedback,rating) values('${feedbackData.release_id}','${feedbackData.artist}','${feedbackData.feedback}','${feedbackData.rating}')`, 
        function (error, results, fields) { 
            res.send('done');
        }
    );
});

// Download release
app.post('/download_release', (req, res) => {
    // console.log("inne i download");

    // // var encondedImage = new Buffer(`uploads/artwork/1544397293164-A_SIDE.jpg`, 'base64');

    fs.readFile(`uploads/artwork/1544558512879-A_SIDE.jpg`,function (err, content) {
        // res.send(content)
        if (!err) {
    //         console.log(content)
            // res.writeHead(200, {'Content-Type': 'image/jpg'})
            // res.end(content,'Base64');
            res.send(content)
    //         // console.log(content)
    //         // (req, res) => {
    //             // res.writeHead(200,{'Content-type':'image/jpg'});
    //             // res.end(content);
    //         //   }

        } else {
            console.log(err);
        }
    });
    

});

/* --- CLEAN ADD RELEASE - START -- */

// Add release
app.post('/add_release', (req, res) => {
    // New release data
    const newRelease = req.body;
    connection.query(
        `insert into  releases(user_id,artist,title,cat_number,info_text,release_date,rating,password,activated) values('${newRelease.user_id}','${newRelease.artist}','${newRelease.title}','${newRelease.cat_nr}','${newRelease.info_text}','${newRelease.release_date}','${newRelease.rating}','${newRelease.password}','1')`, 
        function (error, results, fields) { 
            console.log(results)
            console.log(error)
            res.send(results);

            connection.query(
                `insert into artwork(release_id,image_file) values('${results.insertId}','${newRelease.artwork_name}')`, 
                function (error, results, fields) { 
          
                }
            );

            newRelease.tracks.map((track, index) => {
                connection.query(
                    `insert into tracks(release_id,track_file,track_index) values('${results.insertId}','${track}','${index + 1}')`, 
                    function (error, results, fields) { 
              
                    }
                );                
            })

        }
    );
});

// Add release
app.post('/update_release', (req, res) => {

    connection.query(
        `UPDATE releases SET artist='${req.body.artist}',title='${req.body.title}',cat_number='${req.body.cat_nr}',info_text='${req.body.info_text}',release_date='${req.body.release_date}',rating='${req.body.rating}',password='${req.body.password}' WHERE id='${req.body.release_id}'`, 
        function (error, results, fields) { 
            console.log(error)
            console.log(results)
        }
    );

});

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/artwork/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const upload = multer({ storage })

/* Should able to use same function for both tracks and artwork */ 
app.post('/upload_artwork', upload.single('artwork'), (req, res) => {
    console.log(req.file)
    if (req.file)
        res.json({
            imageUrl: `artwork/${req.file.filename}`,
            imageName: req.file.filename
        });
    else 
        res.status("409").json("No Files to Upload.");
});


// Delete artwork
/* Should able to use same function for both tracks and artwork */
// app.post('/delete_artwork', (req, res) => {
//     const artworkName = req.body.imageName;
//     fs.unlink(`uploads/artwork/${artworkName}`);
// });

const trackStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/tracks/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const trackUpload = multer({ storage: trackStorage })
 
/* Should able to use same function for both tracks and artwork */ 
app.post('/upload_tracks', trackUpload.single('track'), (req, res) => {
    if (req.file)
        res.json({
            trackName: req.file.filename
        });
    else 
        res.status("409").json("No Files to Upload.");
});

app.post('/delete_track', (req, res) => {
    const trackName = req.body.trackName;
    fs.unlink(`uploads/tracks/${trackName}`);
});

app.post('/delete_tracks', (req, res) => {
    const trackNames = req.body.track_names;

    trackNames.map(trackName => {
        fs.unlink(`uploads/tracks/${trackName}`)
    });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));