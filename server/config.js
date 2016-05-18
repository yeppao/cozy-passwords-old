

var americano, path, publicPath, publicStatic, staticMiddleware, viewsDir, salt;

americano = require('americano');

path = require('path');

/*

 */
salt = require('./salt');
salt.getUserSalt();

publicPath = __dirname + "/../client/public";

staticMiddleware = americano["static"](publicPath, {
    maxAge: 86400000
});

publicStatic = function(req, res, next) {
    var assetsMatched, detectAssets;
    detectAssets = /\/(stylesheets|javascripts|images|fonts)+\/(.+)$/;
    assetsMatched = detectAssets.exec(req.url);
    if (assetsMatched != null) {
        req.url = assetsMatched[0];
    }
    return staticMiddleware(req, res, function(err) {
        return next(err);
    });
};

viewsDir = path.resolve(__dirname, '..', 'client');

module.exports = {
    common: {
        use: [
            staticMiddleware,
            publicStatic,
            americano.bodyParser({
                keepExtensions: true
            })
        ],
        useAfter: [
            americano.errorHandler({
                dumpExceptions: true,
                showStack: true
            })
        ],
        set: {
            views: viewsDir,
            'view engine': 'jade'
        }
    },
    development: [americano.logger('dev')],
    production: [americano.logger('short')],
    plugins: ['cozydb']
};