// 03.17 : 모든 라우트 생성

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;

function index(req, res){
  res.cookie('IndexCookie', 'This was set from Index');
  res.render('index', {title: 'Index2', cookie: JSON.stringify(req.cookies), session:JSON.stringify(req.session)});
};


function login(req, res) {
  res.render('login', {title: 'Login', body: 'test'});
};

function loginProcess(req, res) {
  res.redirect('/');
};

function chat(req, res) {
  res.render('chat', {title: 'Chat', body: 'test'});
};