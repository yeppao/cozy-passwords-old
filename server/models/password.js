import * as americano from 'cozydb';
import { makeLogger, promisify, promisifyModel } from '../helpers';

let log = makeLogger('models/account');

let Password = americano.getModel('password', {
    name: String,
    login: String,
    password: String,
    website: String
});

Account = promisifyModel(Account);

let request = promisify(::Password.request);

module.exports = Password;