const Koa = require('koa');
const koaBody = require('koa-body');
const koaJwt = require('koa-jwt');

const Config = require('./utils/config');
const connectDB = require('./utils/db');
const routes = require('./routes/index');

connectDB();

const app = new Koa();

// app.use(
// 	koaJwt({ secret: Config.secrets }).unless({
// 		path: [/^\/addUser|\/login|\/test/],
// 	})
// );

app.use(koaBody());

routes(app);

app.listen(Config.port, () => {
	console.log(`app start at ${Config.port}`);
});
