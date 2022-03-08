const { pool } = require('mssql');
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
    let pool = poolPromise

    let date = req.body.date
    let vacsID = req.body.vacsID
    let persKey = req.boyd.persKey

    pool.request()
    .input('date', sql.Date, date)
    .input('vacsID', sql.Int, vacsID)
    .input('persKey', sql.Int, persKey)
    .execute('addVacsRecord', (err, result)=>{
        if(err){
            console.log(err)
        }

        res.render('vaccination/record/new')
    })
}