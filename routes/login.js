var express = require('express');
var router = express.Router();
var passport = require('passport')

router.post('/attempt', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login/loginerror',
    failureMessage: true
  })
)

router.get('/', (req, res)=>{
    res.render('login')
    }
)

router.get('/loginerror', (req, res)=>{
  res.render('loginerror')
})

router.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/')
})

module.exports = router