var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
  res.render('vaccination/new');
});

module.exports = router;
