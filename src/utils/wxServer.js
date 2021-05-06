const { AppID, AppSecret } = require('./config');
const fetch = require('node-fetch');

const getSession = async (code) => {
	const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`;
	const res = await fetch(url);
	return res.json();
};

module.exports = {
	getSession,
};
