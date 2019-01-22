var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var visitorsRouter = require('./routes/visitors');
var attendanceRouter = require('./routes/attendance');

var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/attendancedb', function (err) {
  if (err) throw err;
  console.log('Successfully connected');
});

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/visitors', visitorsRouter);
app.use('/api/attendance', attendanceRouter);

module.exports = app;
