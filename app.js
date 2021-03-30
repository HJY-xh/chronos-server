const Koa = require('koa');
const Config = require('./utils/config');
const genToken = require('./utils/genToken');
const app = new Koa();

app.listen(Config.port, () => {
	console.log(`app start at ${Config.port}`);
});
