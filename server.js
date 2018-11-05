const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const path = require('path')
const { Pool, Client } = require('pg')

const pool = new Pool()

// create role appserver login password 'chickendinner';
// see https://node-postgres.com/features/connecting to create a .env file
pool.query('select now()', (err, res) => {
  console.log(err,res)
  pool.end()
})

const app = express()

// set static public path
app.use(express.static(path.join(__dirname, 'dist')))

app.use('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'dist/app.html'))
})

const port = process.env.PORT || 8081
app.listen(port, function() {
  console.log('listening to http://localhost:' + port)
})
