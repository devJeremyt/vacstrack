var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var passport = require('passport')
var session = require('express-session')
var localStrategy = require('passport-local').Strategy
const { poolPromise, sql } = require('./db')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//Loads local environment variables


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'rando secret',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge:60000, secure: false}
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use('local', new localStrategy({
  passReqToCallback: true,
  usernameField: 'email'
},
  async function(req, email, password, done){
    const pool = await poolPromise
    pool.request()
    .input('email', sql.NVarChar, email)
    .query('SELECT [PERSON_KEY], [FIRST_NAME], [LAST_NAME], PASSWORD FROM TbPerson WHERE email = @email', (err, recordset)=>{
      if(err){
        console.log(err)
        return done(err)
      } else if(recordset.recordset[0].length < 1){
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
    .query('SELECT * FROM TbPerson WHERE PERSON_KEY = @id', (err, recordset)=>{
    if(err){
      console.log(err)
    }
    done(err, recordset.recordset[0])
  })
})

app.get('/login', (req, res)=>{
  res.render('login')
})




app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/login/attempt', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/loginerror',
  failureMessage: true
}))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  // render the error page
  res.status(err.status || 500);
  res.render('error', {error : err});
});

module.exports = app;
