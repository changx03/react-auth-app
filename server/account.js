const bcrypt = require('bcrypt')
const pgPool = require('./pgPool')

const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
// Eg. generate password hash:
// const password = 'Pass1234'
// const passwordHash = bcrypt.hashSync(password, salt)

function authenticate(email, password, done) {
  findUser(email, (err, user) => {
    if (err) return done(err)
    if (!user) return done(null, false)

    // compare hashed password
    bcrypt.compare(password, user.passwordhash, (err, isEqual) => {
      if (err) return done(err)
      if (!isEqual) return done(null, false)
      return done(null, user)
    })
  })
}

function serializeUser(user, done) {
  done(null, user.userid)
}

function deserializeUser(userid, done) {
  findUserByID(userid, done)
}

function registerUser(user, done) {
  // TODO: can't find user
  ;(async () => {
    const client = await pgPool.connect()
    try {
      const { email, firstname, lastname, password, username } = user
      const queryTxt =
        'insert into appuser(username, firstname, surname, email, passwordhash) values($1, $2, $3, $4, $5) returning userid, email, username, firstname, surname'
      const values = [username, firstname, lastname, email, bcrypt.hashSync(password, salt)]
      const data = await client.query(queryTxt, values)
      const user = data.rows[0]
      console.log('new user:', user)
      done(null, user)
    } finally {
      client.release()
    }
  })().catch(err => done(err))
}

function findUser(email, callback) {
  // TODO: can't find email
  ;(async () => {
    const client = await pgPool.connect()
    try {
      const queryText =
        'select userid, email, username, firstname, surname, passwordhash from appuser where email = $1'
      const values = [email]
      const data = await client.query(queryText, values)
      // not found
      if (data.rowCount === 0) {
        return callback(null)
      }
      const user = data.rows[0]
      return callback(null, user)
    } finally {
      client.release()
    }
  })().catch(err => {
    console.error(err.message)
    return callback(null)
  })
}

function findUserByID(userid, callback) {
  ;(async () => {
    const client = await pgPool.connect()
    try {
      const queryText =
        'select userid, email, username, firstname, surname, passwordhash from appuser where userid = $1'
      const values = [userid]
      const data = await client.query(queryText, values)
      // not found
      if (data.rowCount === 0) {
        return callback(null)
      }
      const user = data.rows[0]
      return callback(null, user)
    } finally {
      client.release()
    }
  })().catch(err => {
    console.error(err)
    return callback(err)
  })
}

module.exports = {
  authenticate,
  serializeUser,
  deserializeUser,
  registerUser
}
