const Koa = require('koa');
const koaBody = require('koa-body');
const Config = require('./utils/config');
const connectDB = require('./utils/db');
const routes = require('./routes/index');

connectDB();

const app = new Koa();

app.use(koaBody());

routes(app);

process.on('uncaughtException', (err) => {
	console.log(err);
});

app.listen(Config.port, () => {
	console.log(`app start at ${Config.port}`);
});
