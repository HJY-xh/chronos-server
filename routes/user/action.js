const mongoose = require('mongoose');
const User = require('../../models/user.modal');

const signToken = require('../../utils/genToken');
const wxServer = require('../../utils/wxServer');
const { encode } = require('../../utils/crypto');

const getUserByOpenId = async (openId) => {
	const users = await User.find({
		openId: openId,
	});
	return users.length > 0 ? users[0] : null;
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
		const session = await wxServer.getSession(params.code);
		const { openid, session_key } = session;
		let user = await getUserByOpenId(openid);
		if (user) {
			await User.updateOne(
				{
					_id: user._id,
				},
				{
					lastLogin: Date.now(),
				}
			);
		} else {
			user = await User.create({
				openId: openid,
			});
		}
		const sessionKey = encode(openid + user._id + session_key);
		ctx.body = {
			status: true,
			session: sessionKey,
		};
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
