var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var passport = require('passport')
var session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var recordsRoutes = require('./routes/records')
var loginRoutes = require('./routes/login')
var vaccinationRoutes = require('./routes/vaccinations')

var app = express();


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
  cookie: {maxAge:6000000, secure: false}
}))

app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next)=>{ res.locals.user = req.user; next()})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRoutes)
app.use('/vaccination', vaccinationRoutes)
app.use('/records' , recordsRoutes)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

require('./auth')

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
