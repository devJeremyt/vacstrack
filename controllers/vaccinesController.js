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
        res.render('index')
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

exports.createTestResult = async function(req, res){
    let pool = await poolPromise
    try {
        pool.request()
        .input('result', sql.Bit, parseInt(req.body.result))
        .input('atHome', sql.Bit, parseInt(req.body.atHome))
        .input('rapid', sql.Bit, parseInt(req.body.rapid))
        .input('persKey', sql.Int, req.user.persKey)
        .input('date', sql.NVarChar, req.body.date)
        .execute('createTestResult', (err, result)=>{
            if(err){
                res.render('error', {error: err})
            } else {
                res.render('index')
            }
        })
    } catch (error) {
        res.render('error', {error: error})
    }
}

exports.viewRecords = async function(req, res){
    let pool = await poolPromise

    pool.request()
    .query(
        'SELECT * FROM tbVacsRecords AS VR ' + 
        'INNER JOIN TbPerson AS PS ON PS.persKey = VR.persKey ' +
        'INNER JOIN TbVaccines AS VA ON VA.vacsId = VR.vacsId', (err, result)=>{
            if(err){
                console.log(err)
                res.render('error', {error: err})
            }

        res.render('record/index', {records : result.recordset})
    })
}

exports.viewIndividualRecord = async function(req, res){
    let pool = await poolPromise

    pool.request()
    .input('persKey', sql.Int, req.user.persKey)
    .query(
        'SELECT * FROM tbVacsRecords AS VR ' + 
        'INNER JOIN TbPerson AS PS ON PS.persKey = VR.persKey ' +
        'INNER JOIN TbVaccines AS VA ON VA.vacsId = VR.vacsId ' +
        'WHERE VR.persKey = @persKey', (err, result)=>{
            if(err){
                console.log(err)
                res.render('error', {error: err})
            }

        res.render('record/index', {records : result.recordset})
    })
}

exports.editRecord = async function(req, res){
    let pool = await poolPromise
    try {
        if(req.query.id == undefined || req.query.id == ''){
            res.render('error', {error: 'No ID was provided.'})
        }

        pool.request()
        .input('id', sql.Int, req.query.id)
        .query('SELECT * FROM tbVacsRecords AS VR ' + 
        'INNER JOIN tbVaccines AS TV ON VR.vacsID = TV.vacsID ' + 
        'WHERE recordID = @id', (err, result)=>{
            if(err){
                res.render('error', {error: err})
            } else{
                res.render('record/edit', {record: result.recordset[0]})
            }
        })
    } catch (error) {
        res.render('error', {error: error})
    }
}

exports.submitRecordEdit = async function(req, res){
    let pool = await poolPromise
    try {

        pool.request()
        .input('id', sql.Int, req.body.recordID)
        .input('vacsId', sql.Int, req.body.vacsID)
        .input('date', sql.Date, req.body.dateTaken)
        .input('doseNumber', sql.Int, req.body.doseNumber)
        .input('location', sql.NVarChar, req.body.location)
        .query('UPDATE tbVacsRecords ' + 
                'SET vacsId = @vacsId, ' +
                'date = @date, ' +
                'doseNumber = @doseNumber, ' + 
                'location = @location, ' +
                'approvalStatus = 0 ' +
                'WHERE recordID = @id', (err, result)=>{
            if(err){
                res.render('error', {error: err})
            } else{
                res.redirect('/records/view')
            }
        })
    } catch (error) {
        res.render('error', {error: error})
    }
}