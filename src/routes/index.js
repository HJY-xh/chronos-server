module.exports = (app) => {
	app.use(async (ctx, next) => {
		ctx.set('Access-Control-Allow-Origin', 'http://localhost:4000');
		ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		ctx.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
		ctx.set('Access-Control-Allow-Credentials', 'true');
		ctx.set('Content-Type', 'application/json;charset=utf-8');
		await next();
	});

	app.use(require('./user/index').routes());
	app.use(require('./goal/index').routes());
};
