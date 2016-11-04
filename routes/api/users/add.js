var express = require('express');
var router = express.Router();

/* Add new user. */
router.post('/', function(req, res, next) {
	var response = {}, user = {};

	user = req.body.user;


	if(user.name) {
		response.data = user;

		res.send(200, response);
	}else{
		response.error = {message:"No username"};

		res.send(404, response);
	}
});

module.exports = router;
