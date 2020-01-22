var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var testAPIRouter = require('./routes/testAPI');
var totalCustomer = require('./routes/totalCustomers');
var customersDetails = require('./routes/customersDetails');
var token = require('./routes/processPBT');
// var transfer = require('./routes/getTransfer');
// var gsfS = require('./routes/getSourceFundingSource');
// var crou = require('./routes/createROUser');
// var testp = require('./routes/testPost');
// var appToken = require('./routes/apptoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/totalCustomers', totalCustomer);
app.use('/customers', customersDetails);
app.use('/pPBT', token);
// app.use('/getTransfer', transfer);
// app.use('/gsFSource', gsfS);
// app.use('/cROUser', crou);
// app.use('/pTest', testp);
// app.use('/appToken', appToken);

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
  res.render('error');
});

module.exports = app;
