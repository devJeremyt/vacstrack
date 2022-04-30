var express = require('express');
var router = express.Router();
const vaccinesController = require('../controllers/vaccinesController')
const authorize = require('../authorize')

router.get('/', authorize(['HR Representative', 'Administrator']), (req, res)=> vaccinesController.viewRecords(req, res))

router.get('/view', authorize(['HR Representative', 'Administrator', 'Standard']), (req,res)=>{vaccinesController.viewIndividualRecord(req, res)})

router.get('/new', (req, res)=>{
    res.render('record/new')
})

router.post('/new', (req, res)=>{
    vaccinesController.addVacsRecord(req, res)
})

router.get('/edit', (req, res)=>vaccinesController.editRecord(req, res))

router.get('/specificrecord', (req, res)=> vaccinesController.viewSpecificRecord(req, res))

router.post('/edit', (req,res)=>vaccinesController.submitRecordEdit(req, res))

router.get('/pendingApproval', authorize(['HR Representative', 'Administrator']), (req, res)=> vaccinesController.viewPendingApprovalRecords(req, res))

router.get('/support/new', (req, res)=> res.render('record/support/new'))

router.post('/support/new', (req,res)=> res.render('index'))

router.get('/test/new', (req, res)=> res.render('record/test/new'))

router.post('/test/new', (req, res)=> vaccinesController.createTestResult(req, res))

router.get('/needapproval', authorize(['HR Representative', 'Administrator']), (req, res)=> vaccinesController.getRecordsPendingApproval(req, res))

router.get('/markApproved', authorize(['HR Representative', 'Administrator']), (req, res)=> vaccinesController.markRecordApproved(req, res))


module.exports = router