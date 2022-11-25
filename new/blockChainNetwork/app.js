var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8976);
// http://IP주소:8976/block.get
app.get("/block.get.latest", function(req, res){
	var w3 = require("web3");
	var web3 = new w3("http://192.168.0.158:8545")
	// 설치한 web3 모듈 불러다가 블록체인 네트워크에 단순 접속
	// geth attach http://192.168.0.158:8545 같은 의미다.
	
	web3.eth.getBlock('latest').then(function(result){
		res.send(result);
	});
	// 이더리움 콘솔에서 쓰던 명령어 입력하면 되며 .then 뒤로 응답 받으면 처리할 콜백함수를 작성하면 된다.
});
//app.post();
app.get("/block.get", function(req, res){
	var no = req.query.no;
	var w3 = require("web3");
	var web3 = new w3("http://192.168.0.158:8545")
	
	web3.eth.getBlock(no).then(function(result){
		res.setHeader("Access-Control-Allow-Origin", "*")
		res.send(result);
	});
});



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
