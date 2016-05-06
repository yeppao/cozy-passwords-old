var index = require('./index');
var password = require('./password');

module.exports = {
  '': { get: index.index },
  'passwords': {
    get: password.all,
    post: password.create
  },
  'passwords/:id': {
    put: password.update,
    delete: password.destroy
  }
};