const express = require('express');
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
        `SELECT * FROM releases WHERE user_id = '${userId}'`,    
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

    // var zip = new JSZip();

    // zip.file("Hello.txt", "Hello World\n");
    
    // // var img = zip.folder("images");
    // // img.file("smile.gif", imgData, {base64: true});
    
    // zip.generateAsync({type:"blob"}).then(function(content) {
    //     // see FileSaver.js
    //     saveAs(content, "example.zip");
    // });
    

});

/* --- CLEAN ADD RELEASE - START -- */

// Add release
app.post('/add_release', (req, res) => {
    // New release data
    const newRelease = req.body;
    console.log(newRelease.tracks)
    connection.query(
        `insert into  releases(user_id,artist,title,cat_number,info_text,release_date,rating,release_file,password) values('${newRelease.user_id}','${newRelease.artist}','${newRelease.title}','${newRelease.cat_nr}','${newRelease.info_text}','${newRelease.release_date}','${newRelease.rating}','releaseFile','${newRelease.password}')`, 
        function (error, results, fields) { 
            res.send(results);

            connection.query(
                `insert into artwork(release_id,image_file) values('${results.insertId}','${newRelease.artwork_name}')`, 
                function (error, results, fields) { 
          
                }
            );

            newRelease.tracks.map(track => {
                connection.query(
                    `insert into tracks(release_id,track_file) values('${results.insertId}','${track}')`, 
                    function (error, results, fields) { 
              
                    }
                );                
            })

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
app.post('/delete_artwork', (req, res) => {
    const artworkName = req.body.imageName;
    fs.unlink(`uploads/artwork/${artworkName}`);
});



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
    // console.log(req.file)
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





/* --- CLEAN ADD RELEASE - END -- */


// session
// https://www.npmjs.com/package/express-mysql-session
// https://stackoverflow.com/questions/46760789/equivalent-of-session-start-and-session-in-node-js-express

// app.use(session({secret: "Shh, its a secret!"}));
// https://www.tutorialspoint.com/expressjs/expressjs_sessions.htm
// Testat koden över
// const loginUser = userId => {
//   app.get('/', function(req, res){
//     // if(req.session.page_views){
//     //    req.session.page_views++;
//     //    res.send("You visited this page " + req.session.page_views + " times");
//     // } else {
//        session.user_id = userId;
//        res.send(session.user_id);
//     });
//   // });
// }

// app.use(session({
//   genid: (req) => {
//     console.log('Inside the session middleware')
//     console.log(req.sessionID)
//     return uuid() // use UUIDs for session IDs
//   },
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }))

// // create the homepage route at '/'
// app.get('/', (req, res) => {
//   console.log('Inside the homepage callback function')
//   console.log(req.sessionID)
//   res.send(`You hit home page!\n`)
//   // res.send(req.sessionID)
// })

// app.post('/login', (req, res) => {
//   console.log('Inside POST /login callback function')
//   console.log(req.body)
//   res.send(`You posted to the login page!\n`)
// })

app.listen(port, () => console.log(`App listening on port ${port}!`));