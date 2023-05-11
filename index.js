const express = require('express')
const cors =require('cors')
const mysql=require('mysql2')
require('dotenv').config()
const app = express()

app.use(cors())

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

app.get('/writer',(req,res)=>{
    connection.query(
        'SELECT * FROM writer',
        function(err ,results, fields){
            res.send(results)

        }
    )
})

app.listen(process.env.PORT || 3000)