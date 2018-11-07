const bcrypt = require('bcrypt')

// create a dummy static user
// generate password
const password = 'Pass1234'
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(password, salt)
const user = {
  userid: 1,
  email: 'test@example.com',
  firstname: 'Test',
  lastname: 'User',
  passwordHash,
  username: 'test'
}

function findUser(email, callback) {
  if (email === user.email) {
    return callback(null, user)
  } else {
    return callback(null)
  }
}

module.exports = {
  user,
  findUser
}
