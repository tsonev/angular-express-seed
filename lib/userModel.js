var crypto = require("crypto");
var speakeasy = require("speakeasy");
var config = require("../config/config");

//Lets load the mongoose module in our program
var mongoose = require('mongoose');

//Lets connect to our database using the DB server URL.
mongoose.connect("mongodb://"+config.mongodb.host+"/"+config.mongodb.collection);

/**
 * Lets define our Model for User entity. This model represents a collection in the database.
 * We define the possible schema of User document and data types of each field.
 * */

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: String,
	password: {
		hashedPassword: String,
		salt: String
	},
	totp: {
		ascii: String,
		hex: String,
		base32: String,
		otpauth_url: String
	},
	auth: {
		certificate: {type: Boolean, default: true},
		password: {type: Boolean, default: true},
		totp: {type: Boolean, default: true}
	},
	roles: Array,
	certificate: {
		publicKey : String
	}
});

userSchema.index({name: 1}, {unique: true});


// assign a function to the "methods" object of our userSchema
userSchema.methods.storeUser = function (userObj, cb) {
	var _userModel = this;

	if (!userObj.hasOwnProperty("password")) {
		throw new Error("No password");
	}

	if (userObj.hasOwnProperty("auth")) {
		_userModel.auth = userObj.auth;
	}
	if (userObj.hasOwnProperty("roles")) {
		_userModel.roles = userObj.roles;
	}

	var salt = crypto.randomBytes(128).toString("base64");

	crypto.pbkdf2(userObj.password, salt, 10000, config.length, function (err, hash) {

		_userModel.password.hashedPassword = hash.toString("hex");
		_userModel.password.salt = salt;

		// Generate time based one time password
		_userModel.totp = speakeasy.generateSecret({length: 20});

		// Set a friendly qr code
		_userModel.totp.otpauth_url = speakeasy.otpauthURL({ secret: _userModel.totp.ascii, label: _userModel.name, issuer: config.totp.issuer });

		_userModel.save(userObj, cb);
	});


};

exports.User = mongoose.model('User', userSchema);
