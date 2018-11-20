const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql');
const bodyParser = require('body-parser');

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
  const newUser = req.body;
  connection.query(
  "insert into users(username,password,email,label_name) values('" + newUser.username + "','" + newUser.password + "','" + newUser.email + "','" + newUser.label_name + "')", 
  function (error, results, fields) { 
    console.log(results);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));