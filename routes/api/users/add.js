var express = require('express');
var router = express.Router();

var QRCode = require('qrcode');


var userModel = require('../../../lib/userModel');


/* Add new user. */
router.post('/', function(req, res, next) {
	var response = {}, user = {};

	user = req.body.user;

	if(user.name && user.password) {

		var user1 = new userModel.User({name: user.name});

		user1.storeUser(user,function (err, userObj) {
			if (err) {
				response.error = {message:err};

				res.send(404, response);
			} else {

				QRCode.toDataURL(userObj.totp.otpauth_url, function (err, data_url) {

					// Display this data URL to the user in an <img> tag
					// Example:

					response.data = userObj;

					response.qr = data_url;

					res.status(200).send(response);

				});

			}
		});


	}else{
		response.error = {message:"No username"};

		res.send(404, response);
	}
});

module.exports = router;
