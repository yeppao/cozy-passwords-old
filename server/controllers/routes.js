import * as password from './password';

module.exports = {
  'passwords': {
    get: password.all,
    post: password.create
  },
  'passwords/:id': {
    put: password.update,
    delete: password.destroy
  }
};