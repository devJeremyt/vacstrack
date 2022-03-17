var express = require('express');
var router = express.Router();
const recordsController = require('../controllers/usersController')
const authorize = require('../authorize')

router.get('/new', (req, res)=>{
    res.render('record/new')
})

module.exports = router