const Koa = require('koa');
const koaBody = require('koa-body');
const koaJwt = require('koa-jwt');

const Config = require('./utils/config');
const routes = require('./routes/index');

const app = new Koa();

app.use(
	koaJwt({ secret: Config.secrets }).unless({
		path: [/^\/test/],
	})
);

app.use(koaBody());

routes(app);

app.listen(Config.port, () => {
	console.log(`app start at ${Config.port}`);
});
