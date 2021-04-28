const jwt = require('jsonwebtoken');
const Config = require('../utils/config');
const User = require('../models/user.modal');

const auth = async (ctx, next) => {
    try{
        const header = ctx.request.header;
        const {token} = header;
        const res = jwt.verify(token, Config.secrets);
        const user = await User.findById(res.id).exec();
        ctx.state.user = user
        next();
    }catch(e){
        ctx.status = 401;
        ctx.body = {
            message: "您的身份认证失败"
        };
    }
}

module.exports = auth;