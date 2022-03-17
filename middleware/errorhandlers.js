// 03.17 : middle 추가
exports.notFound = function notFound(req, res, next) {
    res.send(404, 'You seem list. You must havetaken a wrong turn back there.');
};

exports.error = function error(err, req, res, next) {
    console.log(err);
    res.send(500, 'Something broke. What did you do?');
};
