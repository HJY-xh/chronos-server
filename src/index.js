const Koa = require('koa');
const koaBody = require('koa-body');
const Config = require('./utils/config');
const connectDB = require('./utils/db');
const routes = require('./routes/index');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { default: enforceHttps } = require('koa-sslify');

connectDB();

const app = new Koa();

app.use(
	enforceHttps({
		port: Config.port
	})
);

app.use(koaBody());

routes(app);

process.on('uncaughtException', (err) => {
	console.log(err);
});

let options = {
	key: fs.readFileSync(path.join(path.resolve('.'), '/ssl/server.key')),
	cert: fs.readFileSync(path.join(path.resolve('.'), '/ssl/server.crt'))
};

https.createServer(options, app.callback()).listen(Config.port, () => {
	console.log(`app start at ${Config.port}`);
});
