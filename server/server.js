const express = require('express');
const app = express();
const port = 3001;
const mysql = require('mysql');

// Database connection
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : '8889',
  user     : 'root',
  password : 'root',
  database : 'promomoria'
});

app.get('/fetch', (req, res) => {

  connection.query('SELECT * FROM `users`', function (error, results, fields) {
    console.log(results);
    res.send(results)
  });

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));