const bcrypt = require('bcrypt')

// create a dummy static user
// generate password
const password = 'Pass1234'
const saltRounds = 10
const salt = bcrypt.genSaltSync(saltRounds)
const passwordHash = bcrypt.hashSync(password, salt)
const user = {
  userid: 1,
  email: 'slimloook@gmail.com',
  firstname: 'Luke',
  lastname: 'Chang',
  passwordHash,
  username: 'luke'
}

function findUser(username, callback) {
  if (username === user.username) {
    return callback(null, user)
  } else {
    return callback(null)
  }
}

module.exports = {
  user,
  findUser
}
