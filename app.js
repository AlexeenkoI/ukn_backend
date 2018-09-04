var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const jsonParser = require('body-parser');
var logger = require('morgan');
const http = require('http')
//ToDo разобрать с сокетами

const socketServer =require('socket.io')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contractsRouter = require('./routes/contracts');

var app = express();
var server = http.createServer(app);
var server = app.listen(3002);
var io = socketServer(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jsonParser.json());

app.use('/api', indexRouter);
app.use('/api/users/', usersRouter);
app.use('/api/contracts', contractsRouter);

//start socket connections
const connections = [];
io.on('connection', function (socket) {
  connections.push(socket.id);
  console.log("Connected to Socket!!"+ socket.id) ;
  socket.on('disconnect', function(){
    console.log('Disconnected - '+ socket.id);
    //ToDo delete connections from poll array
  });
  setTimeout(()=>{io.emit('testEvent',{msg:'test'})})
  
})



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
