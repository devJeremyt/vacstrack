const { sql, poolPromise } = require('../db');

//Gets the results of all the users in the persons table
//TODO filter it by company
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

exports.addUser = async function(req, res){
    let pool = await poolPromise
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let streetAddress = req.body.streetAddress
    let city = req.body.city
    let state = req.body.state
    let zip = req.body.zip
    let homePhone = req.body.homePhone
    let mobilePhone = req.body.mobilePhone
    let employeeType = req.body.employeeType
    let password = req.body.password
    let email = req.body.email
    try {
        pool.request()
        .input('firstName', sql.NVarChar, firstName)
        .input('lastName', sql.NVarChar, lastName)
        .input('password', sql.NVarChar, password)
        .input('email', sql.NVarChar, email)
        .input('street', sql.NVarChar,streetAddress)
        .input('city', sql.NVarChar, city)
        .input('state', sql.NVarChar, state)
        .input('zip', sql.NVarChar, zip)
        .input('homePhone', sql.NChar, homePhone)
        .input('mobilePhone', sql.NChar, mobilePhone)
        .input('type', sql.NVarChar, employeeType)
        .execute('addUser', (err, result)=>{
            if(err){
                console.log(err)
                console.log(result)
            } else {
                res.render('user/confirmation')
            }
        })
    } catch (error) {
        console.log(error)
    }

}