var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var usersRouter = require('./routes/users');
var socket_io = require('socket.io');

var draw = express();

var io = socket_io({wsEngine: 'ws'});
draw.io = io;

var indexRouter = require('./routes/index')(io);


draw.set('views', path.join(__dirname, 'views'));
draw.set('view engine', 'ejs');

draw.use(logger('dev'));
draw.use(express.json());
draw.use(express.urlencoded({ extended: false }));
draw.use(cookieParser());
draw.use(express.static(path.join(__dirname, 'public')));

draw.use('/', indexRouter);
draw.use('/users', usersRouter);


draw.use(function(req, res, next) {
  next(createError(404));
});

// error handler
draw.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.draw.get('env') === 'development' ? err : {};

  
  res.status(err.status || 500);
  res.render('error');
});

module.exports = draw;
