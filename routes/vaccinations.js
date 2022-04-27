var express = require('express');
var router = express.Router();
const controller = require('../controllers/vaccinesController')

router.get('/new', function(req, res, next) {
  res.render('vaccination/new');
});

router.post('/new', (req, res)=>{
    controller.addVaccine(req,res)
})

router.get('/search', (req, res)=>{
  controller.searchVaccine(req, res)
})

router.get('/report', (req, res)=> res.render('vaccination/report'))

// router.get('/covidrates' (req, res)=> controller.getCovidRates)

module.exports = router;
