const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const { pgPool, salt } = require('../db')

const router = express.Router()

router.post('/signup', (req, res, next) => {
  const that = this
  const { email, firstname, lastname, password, username } = req.body
  console.log(
    `email: ${email}, firstname: ${firstname}, surname: ${lastname}, username: ${username}, password: ${password}`
  )
  ;(async () => {
    const client = await pgPool.connect()
    try {
      const queryTxt =
        'insert into appuser(username, firstname, surname, email, passwordhash) values($1, $2, $3, $4, $5) returning userid, email, username, firstname, surname'
      const values = [username, firstname, lastname, email, bcrypt.hashSync(password, salt)]
      const data = await client.query(queryTxt, values)
      const user = data.rows[0]
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json({
        message: 'Registration successful',
        username,
        userid: user.userid
      })
    } finally {
      client.release()
    }
  })().catch(err => {
    res.setHeader('Content-Type', 'application/json')
    res.status(403).json({
      error: err.message
    })
  })
})

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      return res.status(401).json({
        error: 'The password or email is not correct'
      })
    }
    req.logIn(user, err => {
      if (err) return next(err)
      const { passwordhash, ...userWithoutPassword } = user
      return res.status(200).json({ 
        message: 'Login successful',
        ...userWithoutPassword
      })
    })
  })(req, res, next)
})

module.exports = router
