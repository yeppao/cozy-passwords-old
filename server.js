var americano = require('americano');
var cozydb = require('cozydb');

/*
 CouchDB views initialization. It must be done before starting the server.
 */
cozydb.configure(__dirname, null, function() {
    var port = process.env.PORT || 3243;
    americano.start({
        name: 'cozy-passwords',
        port: port,
        root: __dirname
    }, function (err, app, server) {
        // Do something when everything is properly started.
    });
});