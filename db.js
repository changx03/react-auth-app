const bcrypt = require('bcrypt')
const { Pool } = require('pg')

const pgPool = new Pool()

pgPool.on('error', err => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// create a dummy static user
// generate password
// const password = 'Pass1234'
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
// const passwordHash = bcrypt.hashSync(password, salt)
// const user = {
//   userid: 1,
//   email: 'test@example.com',
//   firstname: 'Test',
//   lastname: 'User',
//   passwordHash,
//   username: 'test'
// }

function findUser(email, callback) {
  if (!email) return callback(null)
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

function findUserByID (userid, callback) {
  console.log('findUserByID', userid)

  ;(async () => {
    const client = await pgPool.connect()
    try {
      const queryText =
        'select userid, email, username, firstname, surname, passwordhash from appuser where userid = $1'
      const values = [userid]
      const data = await client.query(queryText, values)
      console.log('findUserByID', data)
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
  // user,
  findUser,
  findUserByID,
  pgPool,
  salt
}
