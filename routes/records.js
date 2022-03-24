var express = require('express');
var router = express.Router();
const vaccinesController = require('../controllers/vaccinesController')
const authorize = require('../authorize')

router.get('/new', (req, res)=>{
    res.render('record/new')
})

router.post('/new', (req, res)=>{
    vaccinesController.addVacsRecord(req, res)
})

router.get('/view', (req, res)=> res.render('error', {error: "Page coming soon"}))

router.get('/support/new', (req, res)=> res.render('error', {error: "Page coming soon"}))

router.get('/test/new', (req, res)=> res.render('error', {error: "Page coming soon"}))

module.exports = router