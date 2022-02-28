var express = require('express');
var router = express.Router();
const authorize = require('../authorize')

/* GET home page. */
router.get('/',function(req, res, next) {
  console.log(req.user)
  res.render('index', { title: 'VacsTrack' });
});

module.exports = router;
