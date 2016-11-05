var express = require('express');
var router = express.Router();
var userModel = require('../../../lib/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var userList = {
		data:[

		]
	};

	userModel.User.find({}, function(err, users) {


		userList.data = users;

		res.json(userList);

	})


});

module.exports = router;
