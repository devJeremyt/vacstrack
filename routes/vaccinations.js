var express = require('express');
var router = express.Router();
const controller = require('../controllers/vaccinesController')

router.get('/new', function(req, res, next) {
  res.render('vaccination/new');
});

router.post('/new', (req, res)=>{
    controller.addVaccine(req,res)
})

module.exports = router;
