const express = require('express')
const cors =require('cors')
const mysql=require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())

const connection=mysql.createConnection(process.env.DATABASE_URL)

app.get('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.get('/news',(req,res)=>{
    connection.query(
        'SELECT * FROM news',
        function(err ,results, fields){
            res.send(results)

        }
    )
})

app.get('/news/:sport', (req, res) => {
  const sport = req.params.sport;
  connection.query(
    'SELECT * FROM news WHERE type = ?',
    [sport],
    function(err, results, fields) {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.get('/news/:game', (req, res) => {
  const sport = req.params.game;
  connection.query(
    'SELECT * FROM news WHERE type = ?',
    [game],
    function(err, results, fields) {
      if (err) throw err;
      res.send(results);
    }
  );
});

app.post('/news/create', function (req, res, next) {
    connection.query(
      'INSERT INTO news(header, body,pic, wid,type) VALUES (?, ?, ?,?,?)',
      [req.body.header, req.body.body, req.body.pic,req.body.wid,req.body.type],
      function(err, results) {
        res.send(results);
      }
    );
  })

  app.delete('/news/detele', function (req, res, next) {
    connection.query(
      'DELETE FROM news WHERE nid = ?',
      [req.body.nid],
      function(err, results) {
        res.send(results)
      }
    );
  })

app.get('/writer',(req,res)=>{
    connection.query(
        'SELECT * FROM writer',
        function(err ,results, fields){
            res.send(results)

        }
    )
})
app.post('/users', function(request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  // Ensure the input fields exists and are not empty
  if (username && password) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    connection.query('SELECT * FROM writer WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
          //request.session.loggedin = true;
          //request.session.username = username;
        // Redirect to home page
        response.send(results);
      } else {
        response.send('Incorrect Username and/or Password!');
      }     
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
});
app.put('/news/update', function (req, res, next) {
  const nid = req.params.nid;
  const { header, body, pic, type } = req.body;
  connection.query(
    'UPDATE news SET header = ?, body = ?, pic = ?,  type = ? WHERE nid = ?',
    [header, body, pic, type, nid],
    function(err, results) {
      res.send(results);
    }
  );
});

app.listen(process.env.PORT || 3000)