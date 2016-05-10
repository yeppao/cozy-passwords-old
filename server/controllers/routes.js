var index = require('./index');
var password = require('./password');

module.exports = {
  '': { get: index.index },
  'passwords': {
    get: password.retrieveAll,
    post: password.create
  },
  'passwords/:id': {
    get: password.findById,
    put: password.update,
    delete: password.destroy
  }
};