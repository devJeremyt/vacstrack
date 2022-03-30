const { sql, poolPromise } = require('../db');

exports.addVaccine = async function(req, res){
    let vacsType = req.body.vacsType
    let date = req.body.date
    let manufacturer = req.body.manufacturer
    let name = req.body.name

    let pool = await poolPromise
    pool.request()
    .input('vacsType', sql.NVarChar, vacsType)
    .input('manufacturer', sql.NVarChar, manufacturer)
    .input('name', sql.NVarChar, name)
    .execute('addVaccine', (err, result)=>{
        if(err){
            console.log(err)
        }
        res.render('vaccination/new')
    })
}

exports.addVacsRecord = async function(req, res){
    let pool = await poolPromise

    let date = req.body.dateTaken
    let vacsID = req.body.vacsID
    let persKey = req.body.employeeID
    let doseNumber = req.body.doseNumber
    let location = req.body.location

    pool.request()
    .input('date', sql.Date, date)
    .input('vacsID', sql.Int, vacsID)
    .input('persKey', sql.Int, persKey)
    .input('doseNumber', sql.Int, doseNumber)
    .input('location', sql.NVarChar, location)
    .execute('addVacsRecord', (err, result)=>{
        if(err){
            console.log(err)
        }
        res.render('record/new')
    })
}

exports.searchVaccine = async function(req, res){
    let pool = await poolPromise

    let vaccine = req.query.vacsType
    console.log(vaccine)
    if(vaccine !== ''){
        pool.request()
        .input('search', sql.NVarChar, vaccine)
        .execute('searchVaccine', (err, result)=>{
            if(err){
                res.status('500').json('')
            }
            res.status(200).json(result.recordset)
        })
    } else {
        res.status(200).json('Vaccine was empty string')
    }
}

exports.getRecordsPendingApproval = async function(req, res){
    let pool = await poolPromise

    try {
        pool.request()
        .execute('getRecordsPendingApproval', (err, result)=>{
            if(err){
                console.log(result)
                res.status('500').json([])
            }
            res.status(200).json(result.recordset)
        })
    } catch (error) {
        
    }
}

exports.viewPendingApprovalRecords = async function(req, res){
    let pool = await poolPromise

    try {
        pool.request()
        .execute('getRecordsPendingApproval', (err, result)=>{
            if(err){
                res.render('error', {error: err})
            } else{
                res.render('record/pendingApproval', {records: result.recordset})
            }
        })
        } catch (error) {
            res.render('error', {error: error})
        }
}

exports.markRecordApproved = async function(req, res){
    let pool = await poolPromise
    try {
        pool.request()
        .input('recordID', sql.Int, req.query.recordId)
        .execute('markRecordAsApproved', (err, result)=>{
            if(err){
                res.render('error', {error: err})
            } else {
                res.redirect('/records/pendingApproval')
            }
        })
    } catch (error) {
        
    }
}