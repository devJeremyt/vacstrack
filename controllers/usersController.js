const { pool } = require('mssql');
const { sql, poolPromise } = require('../db');

exports.getUsers = async function(){
    let pool = await poolPromise
    return new Promise((resolve, reject)=>{
        try{
            pool.query('select * from tbPerson', (err, result)=>{
                if(err){
                    console.log(err)
                } else{
                    resolve(result);
                }
            })
        } catch (err){
            console.log(err)
        }
    })
}