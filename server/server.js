const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const multer = require('multer');
const cors = require('cors');

// const session = require('express-session');
// const uuid = require('uuid/v4')

// Database connection
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

/* --- CLEAN ADD RELEASE - START -- */

// Add release
app.post('/add_release', (req, res) => {
    // New release data
    const newRelease = req.body;
    console.log(newRelease.tracks)
    connection.query(
        `insert into  releases(user_id,artist,title,cat_number,info_text,release_file,password) values('${newRelease.user_id}','${newRelease.artist}','${newRelease.title}','${newRelease.cat_nr}','${newRelease.info_text}','releaseFile','${newRelease.password}')`, 
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





// // Create new user
// app.post('/add_user', (req, res) => {
//   // New user data
//   const newUser = req.body;
//   // Add data to database
//   connection.query(
//     `insert into users(username,password,email,label_name) values('${newUser.username}','${newUser.password}','${newUser.email}','${newUser.label_name}')`, 
//     function (error, results, fields) { 
//       if (results) {
//         console.log('success');
//       } else if (error) {
//         console.log('error');
//       }
//     }
//   );
// });

// // Login user
// app.post('/login', (req, res) => {
//   const loginUser = req.body;

//   connection.query(
//     `SELECT id, label_name FROM users WHERE email = '${loginUser.email}' AND password = '${loginUser.password}'`, 
//     function (error, results, fields) { 
//       if (results.length > 0) {
//         res.send(results)
//         // loginUser(results[0].id)
//       } else if (error) {
//         console.log(error);
//       }
//     }
//   );
// });

// // Fetch release
// app.post('/fetch_release', (req, res) => {
//   const release = req.body;
//   console.log(release)
//   connection.query(
//     `SELECT * FROM releases WHERE id = '${release.id}'`,    
//     function (error, results, fields) { 
//       console.log(results)
//       res.send(results)
//     }
//   );
// });

// Add release
// app.post('/add_feedback', (req, res) => {
//   // New release data
//   const newFeedback = req.body;
//   connection.query(
//     `insert into feedback(release_id,artist_name,feedback,rating) values('${newFeedback.release_id}','${newFeedback.artist_name}','${newFeedback.feedback}','${newFeedback.rating}')`, 
//     function (error, results, fields) { 
//       console.log(results)
//     }
//   );
// });

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