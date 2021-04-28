const mongoose = require('mongoose');
const User = require('../../models/user.modal');

const signToken = require('../../utils/genToken');
const wxServer = require('../../utils/wxServer');

const getUserByOpenId = async (openId) => {
	const users = await User.find({
		openId: openId,
	});
	return users.length > 0 ? users[0] : null;
};

/**
 * @function 测试代码
 */
const test = async (ctx) => {
	const token = signToken("6064386ac14712221f67c70f")
	ctx.status = 200;
	ctx.body = {
		token
	};
};

/**
 * @function 测试代码
 */
const test2 = async (ctx) => {
	ctx.status = 200;
	ctx.body = {
		msg: "1"
	};
};

// 用户登录/注册
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
		const token = signToken(user._id);
		ctx.body = {
			status: true,
			token,
		};
	} catch (e) {
		throw new Error('登录失败', e);
	}
};

module.exports = {
	test,
	test2,
	login,
};
