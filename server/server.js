const express = require('express');
const app = express();
// const session = require('express-session');
const port = 3001;
const mysql = require('mysql');
const bodyParser = require('body-parser');

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

// Create new user
app.post('/add_user', (req, res) => {
  // New user data
  const newUser = req.body;
  // Add data to database
  connection.query(
    `insert into users(username,password,email,label_name) values('${newUser.username}','${newUser.password}','${newUser.email}','${newUser.label_name}')`, 
    function (error, results, fields) { 
      if (results) {
        console.log('success');
      } else if (error) {
        console.log('error');
      }
    }
  );
});
// Login user
app.post('/login', (req, res) => {
  // Login user data
  const loginUser = req.body;

  connection.query(
    `SELECT id, label_name FROM users WHERE email = '${loginUser.email}' AND password = '${loginUser.password}'`, 
    function (error, results, fields) { 
      if (results.length > 0) {
        res.send(results)
        // loginUser(results[0].id)
      } else if (error) {
        console.log(error);
      }
    }
  );
});

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