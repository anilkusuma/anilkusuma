module.exports = serveindex;
var path = require('path');
function serveindex(){
    return function(req, res){
        res.sendFile(path.resolve('../client/404.html'));
    }
}