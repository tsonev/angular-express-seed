var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var userList = {
		data:[
			{id:1,name:"Stamat"},
			{id:2,name:"john"},
			{id:3,name:"Smith"},
			{id:4,name:"Mike"},
			{id:5,name:"Spiridon"}
		]
	};
	res.json(userList);
});

module.exports = router;
