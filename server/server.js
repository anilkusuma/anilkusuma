'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();
var multer = require('multer');
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit:10000})); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true,limit:10000})); // for parsing application/x-www-form-urlencoded
app.start = function() {
    return app.listen(function() {
        app.emit('started');
        var baseUrl = app.get('url').replace(/\/$/, '');
        console.log('Web server listening at: %s', baseUrl);
        if (app.get('loopback-component-explorer')) {
            var explorerPath = app.get('loopback-component-explorer').mountPath;
        }
    });
};

boot(app, __dirname, function(err) {
    if (err) 
        throw err;
    if (require.main === module)
        app.start();
});
