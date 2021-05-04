const { Goal, Action } = require('../../models/goal.modal');


const getGoalByName = async (name) => {
	const goals = await Goal.find({
		name,
	});
	return goals.length > 0 ? goals[0] : null;
};

const finishAction = async (ctx) => {};

const getActionList = async (ctx) => {};

const getGoalList = async (ctx) => {
	try {
		let goals = await Goal.find({});
		goals = goals.map(item=>{
			return {
				id: item._id,
				status: item.status,
				name: item.name,
				actions: item.actions
			}
		})
		ctx.body = {
			status: true,
			data: goals
		};
	} catch (e) {
		throw new Error('查询失败', e);
	}
};

const createGoal = async (ctx) => {
	const params = ctx.request.body;
	const user = ctx.state.user;
	const { name } = params;
	try {
		const goal = await getGoalByName(name);
		if (goal) {
			ctx.status = 409;
			ctx.body = {
				status: true,
				message: '创建失败，该目标已存在',
			};
			return
		}
		await Goal.create({
			userId: user._id,
			name,
		});
		ctx.body = {
			status: true,
			message: '创建成功',
		};
	} catch (e) {
		throw new Error('创建失败', e);
	}
};

module.exports = {
	finishAction,
	getActionList,
	getGoalList,
	createGoal,
};
