'use strict';

module.exports = function(server) {
    var customeLib = require('../customlib.js');
    var path = require('path');
    var router = server.loopback.Router();
    var util=require('util');
    var multer = require('multer');
    var path = require('path');
    var nodemailer = require('nodemailer');
	var fs = require('fs-extra');
	var xoauth2 = require('xoauth2');
	var moment = require('moment');
    router.get('/',function(req,res){
        res.sendFile(path.resolve('../client/index.html'));
    });
    router.post('/api/sendmail',function(req,res){

	    var valid = true;
	    if(req.body.sendName == undefined || req.body.sendName == undefined){
	    	valid = false;
	    }
	    if(req.body.mailMessage == undefined || req.body.mailMessage == undefined){
	    	valid = false;
	    }
	    if(req.body.fromEmailId == undefined || req.body.fromEmailId == undefined){
	    	valid = false;
	    }
	    if(valid){
	    	var smtpTransport = nodemailer.createTransport({
			  	service: "gmail",
				auth: {
					user: 'anilkusuma.k@gmail.com',
        			pass: 'anilpagon14@'
					// 	xoauth2: xoauth2.createXOAuth2Generator({
					// 	user: 'developeratcrown@gmail.com',
     				// 	clientId: '331128588958-2140e791rj8sek2kvipv6jvmc2or30pk.apps.googleusercontent.com',
     				// 	clientSecret: 'YzHDlzAzH1tsSu59lFk2sH4k',
     				//	refreshToken: '1/IlOkY4hhZFb2jnqbocWGZWifcG_kZrMaBDFpbPUr_H-EovjcTgroM_VXI3KNkNeV',
     				//	accessToken: 'ya29.Ci-JA9hrH4mDh9ZvzAeoBjvPZLNdEHHn4b_9x7kXpLNzu7NRr8VfXO4FU1Sah-U49Q'
     				//	})
        			//	user: "developeratcrown@gmail.com",
				    //  clientId: "118925136734-hhnud08gl9t5uuftd0bs6d3n9ibnap21.apps.googleusercontent.com",
				    //  clientSecret: "PNhIsrU1LaVWFOd8byp34tdL",
				    //  refreshToken: "1/_OE2F5bv17e85aO688Zl7_sB2XzfF_GVII4oBtF9BUyMCQipzhFb8et4jM7y6tVk",//1/YjUoRF2IYGNfe1YJf32Q7mpZQxXMot98m492J7bCysQ",
				    //  accessToken:"ya29.GlsIBKxQjPhM8kpzyxRGeVwpNmwskRPyML4jkiAGUMQHn04G1PlxS4hZvNffgsx7CgDLh60llapWnZBWbU2rGaopMQn656KESVW0nQbcYoaRrRtmEu4iuKnDDRFg",//ya29.GlsIBEi0daPlit5iB9Mg1Wp1ajlylwBS2AzZzKq6eGLMeWfzGbSSQxbwhSKvOl3odSCbrUXZDGKcCI-rS0YT5kbdo52D6Z1mZysMHaNn4yMTiSQbQKLRXp0SrYTp"
				    // })     	
				}
			});

  		  	var mailOptions = {
			  	from: 'Anil Kusuma<anilkusuma.k@gmail.com>',
			  	to: 'Anil Kusuma<anilkusuma.k@gmail.com>',
			  	subject: 'Contact Message Through Website From '+ req.body.sendName+' email '+req.body.fromEmailId,
			  	generateTextFromHTML: true,
			  	html: '<p>'+req.body.mailMessage+'</p>'			
			};
			smtpTransport.sendMail(mailOptions,function(err, info){
	            if(err){
	            	var result = {};
	            	result.returnStatus = "ERROR";
	            	res.send(result);
	               	console.log('Error in sending mail - '+err);
	               	return;
	            }else{
	            	var result = {};
	            	result.returnStatus = "SUCCESS";
	            	res.send(result);
	                console.log('Mail sent');
	                return;
	            }
			  	smtpTransport.close();
			});
		}else{
			var result = {};
	    	result.returnStatus = "ERROR";
	    	res.send(result);
	    	return;
		}
    });
    router.get('/api/downloadresume',function(req,res){
    	res.download('../client/AnilKusumaResume.pdf');
    });
    server.use(router);
};
