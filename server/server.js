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

/* ---- HANDLING USER ---- */

// Change this to a env-variable in production.
app.use(session({
    secret: 'ssshhhhh',
    resave: true,
    saveUninitialized: false
}));

let sess;
// Check for session.
app.get('/', (req,res) => {
    sess = req.session;

    if(sess.user_id) {
        // If session is started:
        connection.query(
            `SELECT id, label_name FROM users WHERE id = '${sess.user_id}'`, 
            (error, results, fields) => { 
                if (results) {
                    res.send({
                        success: true,
                        user_id: results[0].id,
                        label_name: results[0].label_name
                    });                   
                } else {
                    res.send({success: false});
                }             
            }
        );
    }
});

// Log in user.
app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    connection.query(
        `SELECT id, label_name, password FROM users WHERE email = '${email}'`, 
        (error, results, fields) => { 
            if (results) {
                // Bcrypt is matching the password against the result-hashed-password.
                bcrypt.compare(password, results[0].password, function (err, result) {
                    if (result === true) {
                        // Sets the user id for session.
                        sess = req.session;
                        sess.user_id=results[0].id;
                        // Success response sent to React app.
                        res.send({
                            success: true,
                            user_id: results[0].id,
                            label_name: results[0].label_name
                        });
                    } else {
                        // If password is not correct.
                        res.send({
                            success: false,
                            message: 'Your password is not correct'
                        });
                    }
                });              
            } else {
                // If login fails.
                res.send({
                    success: false,
                    message: 'Your e-mail or password is not correct'
                });
            }
        }
    );
});

// Log out user.
app.post('/logout', (req,res) => {
    req.session.destroy();
    res.send(true);
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
        (error, results) => { 
            if (!results.length) {
                // If email doesnt exist, add user to database.
                connection.query(
                    `insert into users(password,email,label_name) values('${hashedPassword}','${email}','${labelName}')`, 
                    (error, results) => { 
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

/* --- HANDLING GETS --- */

// General SELECT * FROM query.
app.get('/fetch_all', (req, res) => {
    const table = req.query.table;
    const column = req.query.column;
    const searchValue = req.query.search_value;
    const orderByValue = req.query.order_by;

    connection.query(
        `SELECT * FROM ${table} WHERE ${column} = '${searchValue}' ORDER BY ${orderByValue} DESC`,    
        (error, results, fields) => { res.send(results); }
    );
});

// Fetch release.
app.get('/fetch_release', (req, res) => {
    const releaseId = req.query.release_id;
        connection.query(
        `SELECT distinct u.id AS userId, u.label_name AS label_name, r.*, a.image_file, (select GROUP_CONCAT(track_file SEPARATOR '|') from tracks where release_id = r.id ORDER BY track_index) AS files FROM releases r LEFT JOIN users u ON u.id=r.user_id LEFT JOIN artwork a ON a.release_id LEFT JOIN tracks t ON t.release_id = r.id WHERE r.id=${releaseId}`,
        (error, results, fields) => { res.send(results); }
    );
});

/* ---- HANDLING POSTS ---- */

// Add release
app.post('/add_release', (req, res) => {
    const newRelease = req.body;
    // Adding the new release information to database.
    connection.query(
        `insert into releases(user_id,artist,title,cat_number,info_text,release_date,rating,password,activated) values('${newRelease.user_id}','${newRelease.artist}','${newRelease.title}','${newRelease.cat_nr}','${newRelease.info_text}','${newRelease.release_date}','${newRelease.rating}','${newRelease.password}','1')`, 
        (error, results, fields) => { 
            res.send(results);

            // Adding artwork name to database.
            connection.query(`insert into artwork(release_id,image_file) values('${results.insertId}','${newRelease.artwork_name}')`);

            newRelease.tracks.map((track, index) => {
                // Looping tracks array, adding track-name and index på database.
                connection.query(`insert into tracks(release_id,track_file,track_index) values('${results.insertId}','${track}','${index + 1}')`);                
            });
        }
    );
});

// Add feedback
app.post('/add_feedback', (req, res) => {
    const feedbackData = req.body;
    // Adding feedback information to database.
    connection.query(`insert into feedback(release_id,artist_name,feedback,rating) values('${feedbackData.release_id}','${feedbackData.artist}','${feedbackData.feedback}','${feedbackData.rating}')`);
});

/* ---- HANDLING UPDATES ---- */

// Update release status.
app.put('/update_release', (req, res) => {
    const releaseId = req.body.release_id;
    let query = ''
    if (req.body.release_status <= 1) {
        // Handling STATUS query for updating releases.
        const statusValue = req.body.release_status;
        query = `activated = '${statusValue}'`;
    } else {
        // Handling INFORMATION query for updating releases.
        query = `artist='${req.body.artist}',title='${req.body.title}',cat_number='${req.body.cat_nr}',info_text='${req.body.info_text}',release_date='${req.body.release_date}',rating='${req.body.rating}',password='${req.body.password}'`;
    }

    connection.query(
        `UPDATE releases SET ${query} WHERE releases . id = '${releaseId}'`,    
        (error, results, fields) => { 
            if (results) { res.send(true); }
        }
    );
});

/* ---- HANDLING DELETE ---- */

// Delete release and the files related to release.
app.delete('/delete_release', (req, res) => {
    const releaseId = req.body.release_id;

    connection.query(
        `SELECT track_file FROM tracks WHERE release_id = '${releaseId}'`, 
        (error, results, fields) => { 
            results.map(track => {
                // After file-name been fetched, loop array of tracks to be deleted from server.
                fs.unlink(`uploads/tracks/${track.track_file}`,(error)=>{ error ? (console.log(error)) : (console.log('success')) });
            })
        }
    );
    connection.query(
        `SELECT image_file FROM artwork WHERE release_id = '${releaseId}'`, 
        (error, results, fields) => { 
            // Deleting the artwork from server.
            fs.unlink(`uploads/artwork/${results[0].image_file}`,(error)=>{ error ? (console.log(error)) : (console.log('success')) });
        }
    );
    // Deletes data from database.
    connection.query(`DELETE r.*, t.*, a.* FROM releases r LEFT JOIN tracks t ON t.release_id = r.id LEFT JOIN artwork a ON a.release_id WHERE r.id = ${releaseId}`);
});

// Delete files for release that is not submitted.
app.delete('/cancel_upload', (req, res) => {
    // Holds the folder where files to delete is located.
    const uploadFolder = req.body.upload_folder;
    // Holds the name of file to be deleted.
    let fileName = req.body.file_name;
    if (fileName !== []) {
        // If not an array, create an array of value, which makes it possible to reuse the same unlink function in map below.
        fileName = [fileName];
    }
    fileName.map(name => {
        fs.unlink(`uploads/${uploadFolder}/${name}`,(error)=>{ error ? (console.log(error)) : (console.log('success')) });
    })
});

/* ---- HANDLING FILES ---- */

// Sets destination and new file name to file.
const artworkStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/artwork/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const artworkUpload = multer({storage: artworkStorage});

// Receives the artwork-file.
app.post('/upload_artwork', artworkUpload.single('artwork'), (req, res) => {
    if (req.file) {
        // Send the new artwork name back to React.
         res.json({imageName: req.file.filename});       
    }
});

// Sets destination and new file name to file.
const trackStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/tracks/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});
const trackUpload = multer({storage: trackStorage});
 
// Receives the track-file.
app.post('/upload_tracks', trackUpload.single('track'), (req, res) => {
    if (req.file) {
        // Send the new track name back to React.
        res.json({trackName: req.file.filename});
    }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));