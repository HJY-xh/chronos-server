const Koa = require('koa');
const koaBody = require('koa-body');
const Config = require('./utils/config');
const connectDB = require('./utils/db');
const routes = require('./routes/index');
const https = require('https');
const fs = require('fs');
const enforceHttps = require('koa-sslify');

connectDB();

const app = new Koa();

// 强制转化http请求为https
app.use(enforceHttps());

app.use(koaBody());

routes(app);

process.on('uncaughtException', (err) => {
	console.log(err);
});

const options = {
	key: fs.readFileSync('../ssl/xh-hjy.top.key'),
	cert: fs.readFileSync('../ssl/xh-hjy.top.pem')
};

https.createServer(options, app.callback()).listen(Config.port, () => {
	console.log(`app start at ${Config.port}`);
});
