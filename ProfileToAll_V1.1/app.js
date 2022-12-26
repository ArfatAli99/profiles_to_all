var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var exphbs = require('express-handlebars');

//# auth routes
var authRouter = require('./routes/auth');

//# Agency routes
var agencyRouter = require('./routes/agency');

//# SSO routes
var ssoRouter = require('./routes/sso');

//# get list routes
var getRouter = require('./routes/get');

//# Global variable for JWT configuration params
global.config = require('./config');

var app = express();

//# view engine setup
//# I have used the Handle Bars for View template engine

app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/portal', authRouter);
app.use('/agency', agencyRouter);
app.use('/get', getRouter);
app.use('/sso', ssoRouter);

//# catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
