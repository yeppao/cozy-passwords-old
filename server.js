var americano = require('americano');
var cozydb = require('cozydb');

/*
 CouchDB views initialization. It must be done before starting the server.
 */
cozydb.configure(__dirname, null, function() {
    var port = process.env.PORT || 3000;
    americano.start({name: 'testpassword', port: port}, function (err, app, server) {
        // Do something when everything is properly started.
    });
});