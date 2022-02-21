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
    let mobilePhone = req.mobilePhone
    let employeeType = req.employeeType
    console.log(firstName)
    console.log(lastName)
    try {
        pool.request()
        .input('FN', sql.NVarChar, firstName)
        .input('LN', sql.NVarChar, lastName)
        .execute('addUser', (err, result)=>{
            if(err){
                console.log(err)
            } else {
                res.render('user/confirmation')
            }
        })
    } catch (error) {
        console.log(error)
    }

}