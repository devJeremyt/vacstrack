var express = require('express');
var router = express.Router();
var passport = require('passport')

router.post('/attempt', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/loginerror',
    failureMessage: true
  })
)

router.get('/', (req, res)=>{
    res.render('login')
    }
)

module.exports = router