var express = require('express');
var router = express.Router();

var list = require('./list');
var add = require('./add');

/* GET users listing. */
router.use('/list', list);

/* Add new user. */
router.use('/add', add);


module.exports = router;
