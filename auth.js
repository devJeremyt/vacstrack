var passport = require('passport')
var localStrategy = require('passport-local').Strategy

const { poolPromise, sql } = require('./db')

passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'email'
  },
    async function(req, email, password, done){
      const pool = await poolPromise
      pool.request()
      .input('email', sql.NVarChar, email)
      .query('SELECT [persKey], [firstName], [lastname], password FROM TbPerson WHERE email = @email', (err, recordset)=>{
        if(err){
          console.log(err)
          return done(err)
        } else if(recordset.recordset[0] === undefined){
          console.log(recordset)
          return done(null, false, {message: 'Email address is not valid'})
        } else if(recordset.recordset[0].PASSWORD == password){
          return done(null, recordset.recordset[0])
        } else{
          done(null, false, {message: 'Password was incorrect'})
        }
      })
    }
  ))
  
  
  passport.serializeUser(function(user, done){
    done(null, user.PERSON_KEY);
  })
  
  passport.deserializeUser(async function(id, done){
    const pool = await poolPromise
      pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM TbPerson WHERE persKey = @id', (err, recordset)=>{
      if(err){
        console.log(err)
      }
      done(err, recordset.recordset[0])
    })
  })