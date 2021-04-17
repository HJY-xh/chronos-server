const crypto = require('crypto');
const algorithm = 'aes-128-cbc';
const key = Buffer.from('hjy-xh-hjy-xh-xh', 'utf8');
const iv = Buffer.from('HJY-XH-HJY-XH-XH', 'utf8');

// 加密
const encode = (data) => {
	let sign = '';
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	sign += cipher.update(data, 'utf8', 'hex');
	sign += cipher.final('hex');
	return sign;
};

// 解密
const decode = (sign) => {
	let data = '';
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	data += decipher.update(sign, 'hex', 'utf8');
	data += decipher.final('utf8');
	return data;
};

module.exports = {
	encode,
	decode,
};
