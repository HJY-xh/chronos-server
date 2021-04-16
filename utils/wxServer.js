const { appKey, appSecret } = require("../config");
const fetch = require("node-fetch");

module.exports = {
    async getSession(code) {
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${appKey}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
        const res = await fetch(url);
        console.log(res);
    },
};
