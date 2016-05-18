var crypto, algorithm;

crypto = require('crypto');
algorithm = 'aes-256-ecb';

module.exports.encrypt = function(text, toBase64) {
    var cipher = crypto.createCipher(algorithm,GLOBAL.salt);
    text = cipher.update(text, 'utf8', 'hex');
    text += cipher.final('hex');

    if (toBase64) {
        text = new Buffer(text).toString('base64');
    }

    return text;
};

module.exports.decrypt = function(text, isBase64) {
    var decipher = crypto.createDecipher(algorithm,GLOBAL.salt);
    if (isBase64) {
        text = new Buffer(text, 'base64').toString();
    }

    text = decipher.update(text, 'hex', 'utf8');
    text += decipher.final('utf8');

    return text.toString();
};