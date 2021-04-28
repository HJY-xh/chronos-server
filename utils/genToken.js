const jwt = require('jsonwebtoken');
const Config = require('./config');

const genToken = (id) => {
	return jwt.sign(
		{ id },
		Config.secrets,
		{ expiresIn: '2h' }
	);
};

module.exports = genToken;
