var express = require('express');
var router = express.Router();
const authorize = require('../authorize')

/* GET home page. */
router.get('/',function(req, res, next) {
  res.render('index', { title: 'VacsTrack' });
});

router.get('/problem', (req, res)=> res.render('reportProblem'))

router.post('/problem', (req, res)=> res.render('index'))

module.exports = router;
