const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const account = require('../account')

// route to /api/user
const router = express.Router()

router.post('/user/signup', (req, res, next) => {
  account.registerUser(req.body, (err, user) => {
    if (err) {
      res.setHeader('Content-Type', 'application/json')
      res.status(403).json({
        error: err.message
      })
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json({
        message: 'Registration successful',
        username: user.username,
        userid: user.userid
      })
    }
  })
})

router.post('/user/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      return res.status(401).json({
        error: 'The password or email is not correct'
      })
    }
    req.login(user, err => {
      if (err) return next(err)
      const { passwordhash, ...userWithoutPassword } = user
      return res.status(200).json({
        message: 'Login successful',
        ...userWithoutPassword
      })
    })
  })(req, res, next)
})

router.get('/logout', (req, res) => {
  // terminate a login session
  req.logout()
  res.redirect('/login')
})

module.exports = router
