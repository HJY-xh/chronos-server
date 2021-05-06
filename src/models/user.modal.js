const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	openId: {
		type: String,
		index: true,
		unique: true,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	lastLogin: {
		type: Date,
	},
	name: {
		type: String,
	},
	avatar: {
		type: String,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
