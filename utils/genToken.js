const jwt = require('jsonwebtoken');
const Config = require('./config');

const genToken = (id) => {
	const expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);
	return jwt.sign(
		{
			id: id,
			exp: parseInt(expiry.getTime() / 1000),
		},
		Config.secrets
	);
};

module.exports = genToken;
