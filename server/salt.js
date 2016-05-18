var cozydb;

cozydb = require('cozydb');

module.exports.getUserSalt = function() {
    cozydb.api.getCozyUser(function(err, user){
        GLOBAL.salt = user.salt;
    });
};