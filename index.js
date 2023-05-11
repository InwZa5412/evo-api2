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

app.post('/news/create', function (req, res, next) {
    connection.query(
      'INSERT INTO news(header, body,pic, wid) VALUES (?, ?, ?,?)',
      [req.body.header, req.body.body, req.body.pic,req.body.wid],
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

app.listen(process.env.PORT || 3000)