const dotenv = require('dotenv')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const morgan = require('morgan')
const flash = require('connect-flash')
const userRouter = require('./routers/user')
const bcrypt = require('bcrypt')
const { findUser, findUserByID, pgPool } = require('./db')

// load env file
dotenv.config()

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
    cookie: { maxAge: 86400e3 /* in ms 24 * 60 * 60 * 1000 = 1 day */ }
  })
)

// passport strategy
// if use email for login, we have to map email with username field manually
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(email, password, done) {
      console.log(`username: ${email} password: ${password}`)

      findUser(email, (err, user) => {
        if (err) return done(err)
        if (!user) return done(null, false)

        // compare hashed password
        bcrypt.compare(password, user.passwordhash, (err, isEqual) => {
          if (err) {
            return done(err)
          }
          if (!isEqual) {
            return done(null, false)
          }
          return done(null, user)
        })
      })
    }
  )
)

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, done) {
  console.log('serializeUser', user)
  done(null, user.userid)
})

passport.deserializeUser(function(userid, done) {
  findUserByID(userid, done)
})

app.use(passport.initialize())
app.use(passport.session())

// set static public path
app.use(express.static(path.join(__dirname, 'dist')))

// routes
// if anything not start with /api redirect to root
app.get(/^(?!\/api)/, function(_req, res, _next) {
  res.sendFile(path.join(__dirname, 'dist/app.html'))
})
app.use('/api', userRouter)

const port = process.env.PORT || 8081
app.listen(port, function() {
  console.log('listening to http://localhost:' + port)
})
