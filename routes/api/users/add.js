var express = require('express');
var router = express.Router();
var userModel = require('../../../lib/userModel');

/* Add new user. */
router.post('/', function(req, res, next) {
	var response = {}, user = {};

	user = req.body.user;


	if(user.name && user.password) {

		var user1 = new userModel.User({name: user.name, password: user.password});

		user1.save(function (err, userObj) {
			if (err) {
				response.error = {message:err};

				res.send(404, response);
			} else {
				response.data = userObj;

				res.send(200, response);
			}
		});


	}else{
		response.error = {message:"No username"};

		res.send(404, response);
	}
});

module.exports = router;
