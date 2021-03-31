const mongoose = require('mongoose');
const User = require('../../models/user.modal');

const signToken = require('../../utils/genToken');

const addUser = async (ctx) => {
	const params = ctx.request.body;
	const res = await User.find({openId: params.openId});
	if(res.length > 0){
		ctx.status = 200;
		ctx.body = {
			status: false,
			message: "已存在该用户"
		};
		return;
	}
	const newUser = new User(params);
    const user = await newUser.save();
    var token = signToken(user._id);
    ctx.status = 200;
    ctx.body = {
        token
    };
};

module.exports = {
	addUser,
};
