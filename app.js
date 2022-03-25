
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    partials = require('express-partials'),      // 라이브러리에 대한 레퍼런스 생성 
    cookieParser = require('cookie-parser'),     // 쿠키 관련 사용을 위한 레퍼런스 생성
    session = require('express-session')        // 세션 관련 사용을 위한 레퍼런스 생성

// 03.17 : routes 추가
var routes = require('./routes');

// 03.17 : middle 404 추가
var errorHandlers = require('./middleware/errorhandlers');

// 03.17 : log 추가
var log = require('./middleware/log');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(log.logger);
app.use(express.static(__dirname + '/static'));

// 03.17 : cookie 사용
app.use(cookieParser());

// 03.23 : session 사용
app.use(session({secret: 'secret'}));

// 03.23 : 페이지 로드 때 마다 세션 데이터 수정 ( 책 50p )
app.use(function (req, res, next) {
  if (req.session.pageCount)
    req.session.pageCount++;
  else
    req.session.pageCount=1;
  next();
});

// 03.17 : routes 추가
app.get('/', routes.index);
app.get('/login', routes.login);
app.post('/login', routes.loginProcess);
app.get('/chat', routes.chat);

// 03.17 : 에러
app.get('/error', function(req, res, next) {
  next(new Error('A Contrived error'));
});

app.use(partials());   // 미들웨어 추가
app.set('view options', {defaultLayout: 'layout'});

// 03.17 : 에러 헨들러
app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

// 03.17 : 세션
app.use(cookieParser());
app.use(session({secret: 'secret'}));

app.listen(4444);
console.log("App server runnning on port 4444");

module.exports = app;
