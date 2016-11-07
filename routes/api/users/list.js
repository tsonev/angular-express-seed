var express = require('express');
var router = express.Router();
var QRCode = require('qrcode');
var userModel = require('../../../lib/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var response = {};

	userModel.User.find({}, function(err, users) {

		response.data = users;

		res.status(200).send(response);

	})

});

router.get('/:id', function(req, res, next) {
	var search = {}, response = {};

	if(req.params.hasOwnProperty("id")) {
		search._id = req.params.id;
	}
	userModel.User.findOne(search, function(err, userObj) {

		QRCode.toDataURL(userObj.totp.otpauth_url, function (err, data_url) {

			response.data = userObj;

			response.qr = data_url;

			res.status(200).send(response);

		});

	})


});

module.exports = router;
