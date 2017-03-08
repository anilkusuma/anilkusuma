module.exports = serveindex;
var customeLib = require('../customlib.js');
var path = require('path');
function serveindex(){
    return function(req, res){
        res.sendFile(path.resolve('../client/index.html'));
    }
}