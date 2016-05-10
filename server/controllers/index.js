var path = require('path');

module.exports.index = function(req, res, next) {
  res.status(200).sendFile(path.resolve('client/index.html'));
};

module.exports.scripts = function(req, res, next) {
  res.status(200).sendFile(path.resolve('client/scripts'));
}