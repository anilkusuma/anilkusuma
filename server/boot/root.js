'use strict';

module.exports = function(server) {
  	var customeLib = require('../customlib.js');
  	var path = require('path');
  	var router = server.loopback.Router();
  	router.get('/',function(req,res){
    	res.sendFile(path.resolve('../client/index.html'));
  	});
  	server.use(router);
};
