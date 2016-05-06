// ./server.js
var americano = require('americano');

var port = process.env.PORT || 3000;
americano.start({name: 'passwords', port: port}, function(err, app, server) {
    // Do something when everything is properly started.
});