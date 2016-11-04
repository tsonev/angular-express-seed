var express = require('express');
var router = express.Router();

var users = require('./api/users/');

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.send('respond with a resource');
});

/* GET users listing. */
router.use('/users', users);

module.exports = router;
