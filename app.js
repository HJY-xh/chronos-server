const Koa = require('koa');
const Config = require('./utils/config');

const routes = require('./routes/index');

const app = new Koa();

routes(app);

app.listen(Config.port, () => {
	console.log(`app start at ${Config.port}`);
});
