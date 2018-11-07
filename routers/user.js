const express = require('express')
const passport = require('passport')

const router = express.Router()

router.post('/signup', (req, res, next) => {
  const { email, firstname, lastname, password, username } = req.body
  console.log(`email: ${email}, firstname: ${firstname}, surname: ${lastname}, username: ${username}, password: ${password}`)

  res.setHeader('Content-Type', 'application/json')
  res.status(200).json({
    status: 'Registration successful',
    username
  })
})

router.post('/login', passport.authenticate('local', {
  failureFlash: true,
  successFlash: 'login successful'
}
))

module.exports = router
