(() => {
	var t = {
			675: (t, e, s) => {
				const o = s(722),
					a = s(221),
					r = s(984);
				t.exports = async (t, e) => {
					try {
						const s = t.request.header,
							{ token: n } = s,
							i = o.verify(n, a.secrets),
							c = await r.findById(i.id).exec();
						(t.state.user = c), await e();
					} catch (e) {
						(t.status = 401),
							(t.body = {
								status: !1,
								message: '您的身份认证失败'
							});
					}
				};
			},
			995: (t, e, s) => {
				const o = s(619),
					a = new o.Schema({
						name: { type: String },
						startTime: { type: Date, default: new Date() },
						endTime: { type: Date, default: new Date() },
						remark: { type: String }
					}),
					r = new o.Schema({
						userId: { type: String },
						name: { type: String, index: !0, unique: !0 },
						status: { type: Number, default: 0 },
						actions: [a]
					}),
					n = o.model('Action', a),
					i = o.model('Goal', r);
				t.exports = { Action: n, Goal: i };
			},
			984: (t, e, s) => {
				const o = s(619),
					a = new o.Schema({
						openId: { type: String, index: !0, unique: !0 },
						created: { type: Date, default: Date.now },
						lastLogin: { type: Date },
						name: { type: String },
						avatar: { type: String }
					}),
					r = o.model('User', a);
				t.exports = r;
			},
			802: (t, e, s) => {
				const { Goal: o } = s(995);
				t.exports = {
					getActionList: async (t) => {
						const e = t.request.body,
							{ goalId: s } = e;
						try {
							const e = (await o.findById(s)).actions.map(
								(t) => ({
									id: t.id,
									name: t.name,
									remark: t.remark,
									startTime: new Date(t.startTime).getTime(),
									endTime: new Date(t.endTime).getTime()
								})
							);
							t.body = { status: !0, data: e };
						} catch (t) {
							throw new Error('查询失败', t);
						}
					},
					addAction: async (t) => {
						const e = t.request.body,
							{
								goalId: s,
								name: a,
								startTime: r,
								endTime: n,
								remark: i
							} = e;
						try {
							const e = await o.findById(s),
								{ actions: c } = e;
							await o.updateOne(
								{ _id: s },
								{
									actions: [
										...c,
										{
											name: a,
											startTime: r,
											endTime: n,
											remark: i
										}
									]
								}
							),
								(t.body = {
									status: !0,
									message: '创建action成功'
								});
						} catch (t) {
							throw new Error('创建失败', t);
						}
					},
					editAction: async (t) => {
						const e = t.request.body,
							{ goalId: s, id: a, name: r, remark: n } = e;
						try {
							const e = await o.findById(s),
								i = e.actions.id(a);
							(i.name = r),
								(i.remark = n),
								await e.save(),
								(t.body = {
									status: !0,
									message: '更新action成功'
								});
						} catch (t) {
							throw new Error('更新失败', t);
						}
					},
					getGoalList: async (t) => {
						try {
							let e = await o.find({});
							(e = e.map((t) => ({
								id: t._id,
								status: t.status,
								name: t.name,
								actions: t.actions
							}))),
								(t.body = { status: !0, data: e });
						} catch (t) {
							throw new Error('查询失败', t);
						}
					},
					createGoal: async (t) => {
						const e = t.request.body,
							s = t.state.user,
							{ name: a } = e;
						try {
							if (
								await (async (t) => {
									const e = await o.find({ name: t });
									return e.length > 0 ? e[0] : null;
								})(a)
							)
								return (
									(t.status = 409),
									void (t.body = {
										status: !0,
										message: '创建失败，该目标已存在'
									})
								);
							await o.create({ userId: s._id, name: a }),
								(t.body = { status: !0, message: '创建成功' });
						} catch (t) {
							throw new Error('创建失败', t);
						}
					},
					completeGoal: async (t) => {
						const e = t.request.body,
							{ id: s } = e;
						try {
							const e = await o.findById(s);
							await o.updateOne({ _id: s }, { status: 1 }),
								console.log(e),
								(t.body = { status: !0, message: '编辑成功' });
						} catch (t) {
							throw new Error('编辑失败', t);
						}
					}
				};
			},
			164: (t, e, s) => {
				const o = s(757),
					a = s(802),
					r = s(675),
					n = new o();
				n.post('/GetGoalList', r, a.getGoalList),
					n.post('/CreateGoal', r, a.createGoal),
					n.post('/CompleteGoal', r, a.completeGoal),
					n.post('/GetActionList', r, a.getActionList),
					n.post('/AddAction', r, a.addAction),
					n.post('/EditAction', r, a.editAction),
					(t.exports = n);
			},
			540: (t, e, s) => {
				t.exports = (t) => {
					t.use(async (t, e) => {
						t.set('Access-Control-Allow-Origin', '*'),
							t.set(
								'Access-Control-Allow-Headers',
								'Content-Type, Authorization'
							),
							t.set(
								'Access-Control-Allow-Methods',
								'POST, GET, OPTIONS'
							),
							t.set('Access-Control-Allow-Credentials', 'true'),
							t.set(
								'Content-Type',
								'application/json;charset=utf-8'
							),
							await e();
					}),
						t.use(s(402).routes()),
						t.use(s(164).routes());
				};
			},
			183: (t, e, s) => {
				const o = s(984),
					a = s(779),
					r = s(853);
				t.exports = {
					test: async (t) => {
						const e = a('6064386ac14712221f67c70f');
						(t.status = 200), (t.body = { token: e });
					},
					test2: async (t) => {
						(t.status = 200), (t.body = { msg: '1' });
					},
					login: async (t) => {
						const e = t.request.body;
						try {
							const s = await r.getSession(e.code),
								{ openid: n } = s;
							let i = await (async (t) => {
								const e = await o.find({ openId: t });
								return e.length > 0 ? e[0] : null;
							})(n);
							i
								? await o.updateOne(
										{ _id: i._id },
										{ lastLogin: Date.now() }
								  )
								: (i = await o.create({ openId: n }));
							const c = a(i._id);
							t.body = { status: !0, token: c };
						} catch (t) {
							throw new Error('登录失败', t);
						}
					}
				};
			},
			402: (t, e, s) => {
				const o = s(757),
					a = s(183),
					r = s(675),
					n = new o();
				n.get('/test', a.test),
					n.get('/test2', r, a.test2),
					n.post('/login', a.login),
					(t.exports = n);
			},
			221: (t) => {
				t.exports = {
					AppID: 'wxff1105c627258fa7',
					AppSecret: 'b87e85cbedd274c34597c07816850d89',
					port: 4e3,
					secrets: 'HJY-xh',
					DB: { url: 'localhost', port: 27017, name: 'test' }
				};
			},
			677: (t, e, s) => {
				const o = s(619),
					a = s(221),
					r = s(563),
					n = `mongodb://${a.DB.url}:${a.DB.port}/${a.DB.name}`;
				t.exports = async () => {
					try {
						await o.connect(n, {
							useNewUrlParser: !0,
							useUnifiedTopology: !0
						}),
							console.log(
								'\n',
								r.green('MongoDB connection succeeded')
							);
					} catch (t) {
						console.log('\n', r.red(t));
					}
				};
			},
			779: (t, e, s) => {
				const o = s(722),
					a = s(221);
				t.exports = (t) =>
					o.sign({ id: t }, a.secrets, { expiresIn: '2h' });
			},
			853: (t, e, s) => {
				const { AppID: o, AppSecret: a } = s(221),
					r = s(786);
				t.exports = {
					getSession: async (t) => {
						const e = `https://api.weixin.qq.com/sns/jscode2session?appid=${o}&secret=${a}&js_code=${t}&grant_type=authorization_code`;
						return (await r(e)).json();
					}
				};
			},
			563: (t) => {
				'use strict';
				t.exports = require('colors');
			},
			747: (t) => {
				'use strict';
				t.exports = require('fs');
			},
			211: (t) => {
				'use strict';
				t.exports = require('https');
			},
			722: (t) => {
				'use strict';
				t.exports = require('jsonwebtoken');
			},
			639: (t) => {
				'use strict';
				t.exports = require('koa');
			},
			775: (t) => {
				'use strict';
				t.exports = require('koa-body');
			},
			757: (t) => {
				'use strict';
				t.exports = require('koa-router');
			},
			47: (t) => {
				'use strict';
				t.exports = require('koa-sslify');
			},
			619: (t) => {
				'use strict';
				t.exports = require('mongoose');
			},
			786: (t) => {
				'use strict';
				t.exports = require('node-fetch');
			},
			622: (t) => {
				'use strict';
				t.exports = require('path');
			}
		},
		e = {};
	function s(o) {
		var a = e[o];
		if (void 0 !== a) return a.exports;
		var r = (e[o] = { exports: {} });
		return t[o](r, r.exports, s), r.exports;
	}
	(() => {
		const t = s(639),
			e = s(775),
			o = s(221),
			a = s(677),
			r = s(540),
			n = s(211),
			i = s(747),
			c = s(622),
			{ default: d } = s(47);
		a();
		const u = new t();
		u.use(d({ port: o.port })),
			u.use(e()),
			r(u),
			process.on('uncaughtException', (t) => {
				console.log(t);
			});
		let p = {
			key: i.readFileSync(c.join(c.resolve('.'), '/ssl/server.key')),
			cert: i.readFileSync(c.join(c.resolve('.'), '/ssl/server.crt'))
		};
		console.log(c.join(c.resolve('.'), '/ssl/server.key')),
			n.createServer(p, u.callback()).listen(o.port, () => {
				console.log(`app start at ${o.port}`);
			});
	})();
})();
