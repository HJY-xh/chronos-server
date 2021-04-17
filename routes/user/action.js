const mongoose = require('mongoose');
const User = require('../../models/user.modal');

const signToken = require('../../utils/genToken');
const getSession = require('../../utils/wxServer');

const getUserByOpenId = async (openId) => {
	const users = await User.find({
		openId: openId,
	});
	if (users.length) {
		return users[0];
	}
	return null;
};

const test = async (ctx) => {
	ctx.status = 200;
	ctx.body = {
		status: true,
		message: 'succ',
	};
};
// 用户登录
const login = async (ctx) => {
	const params = ctx.request.body;
	try {
		const session = await getSession(params.code);
		const { openid, session_key } = session;
		let user = getUserByOpenId(openid);
		await (user
			? User.create({
					openId: openId,
			  })
			: User.updateOne(
					{
						_id: user._id,
					},
					{
						lastLogin: Date.now(),
					}
			  ));
		// const sessionKey = encode(openid + user._id + session_key);
		// return sessionKey;
	} catch (e) {
		throw new Error('登录失败', e);
	}
};

const addUser = async (ctx) => {
	const params = ctx.request.body;
	const res = await User.find({ openId: params.openId });
	if (res.length > 0) {
		ctx.status = 200;
		ctx.body = {
			status: false,
			message: '已存在该用户',
		};
		return;
	}
	const newUser = new User(params);
	const user = await newUser.save();
	var token = signToken(user._id);
	ctx.status = 200;
	ctx.body = {
		token,
	};
};

module.exports = {
	test,
	login,
	addUser,
};
