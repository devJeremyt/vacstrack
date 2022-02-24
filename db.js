const sql = require('mssql')

const config = {
    user: process.env.SQLUSER,
    password: process.env.SQLPASS,
    server: process.env.DBSERVER,
    database:process.env.DBNAME,
    connectionTime: 30000,
    requestTimeout: 15000,
    timezone: 'utc',
    pool: {
        max:100,
        min: 5
    }, options: {
        enableArithAbort: true,
        trustServerCertificate: true
    }
}
console.log(process.env.DBSERVER)
const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        return pool
    })
    .catch(err => console.log('Database Connection Failed: ', err))

async function run(){
    let pool = await poolPromise

}

run()

module.exports = {sql, poolPromise}