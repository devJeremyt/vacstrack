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

router.get('/pendingApproval', authorize(['HR Representative', 'Administrator']), (req, res)=> vaccinesController.viewPendingApprovalRecords(req, res))

router.get('/support/new', (req, res)=> res.render('error', {error: "Page coming soon"}))

router.get('/test/new', (req, res)=> res.render('record/test/new'))

router.get('/needapproval', authorize(['HR Representative', 'Administrator']), (req, res)=> vaccinesController.getRecordsPendingApproval(req, res))

router.get('/markApproved', authorize(['HR Representative', 'Administrator']), (req, res)=> vaccinesController.markRecordApproved(req, res))


module.exports = router