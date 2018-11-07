const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { Pool, Client } = require('pg')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const morgan = require('morgan')
const flash = require('connect-flash')
const userRouter = require('./routers/user')
const bcrypt = require('bcrypt')
const { user, findUser } = require('./db')

const pgPool = new Pool()

// create role appserver login password 'chickendinner';
// see https://node-postgres.com/features/connecting to create a .env file
// pgPool.query('select * from session', (err, res) => {
//   console.log(err,res)
//   pgPool.end()
// })

const app = express()

// middleware
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(flash())

// use PostgreSql for session store 'connect-pg-simple'
// pg: GRANT ALL PRIVILEGES ON TABLE session TO appserver;
app.use(
  session({
    store: new pgSession({
      pool: pgPool
    }),
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 86400 /* 1 day */ }
  })
)

// passport strategy
passport.use(
  new LocalStrategy(function(username, password, done) {
    console.log(`username: ${username} password: ${password}`)

    findUser(username, (err, user) => {
      if (err) {
        return done(err)
      }
      if (!user) {
        return done(null, false)
      }
      
      // compare hashed password
      bcrypt
    })
  })
)

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  cb(null, user.username)
})

passport.deserializeUser(function(username, cb) {
  findUser(username, cb)
})

app.use(passport.initialize())
app.use(passport.session())

// set static public path
app.use(express.static(path.join(__dirname, 'dist')))

// routes
app.get('/', function(_req, res, _next) {
  res.sendFile(path.join(__dirname, 'dist/app.html'))
})
app.use('/user', userRouter)

const port = process.env.PORT || 8081
app.listen(port, function() {
  console.log('listening to http://localhost:' + port)
})
