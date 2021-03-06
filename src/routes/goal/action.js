const { Goal } = require('../../models/goal.modal');

const getGoalByName = async (name) => {
	const goals = await Goal.find({
		name
	});
	return goals.length > 0 ? goals[0] : null;
};

const getActionList = async (ctx) => {
	const params = ctx.request.body;
	const { goalId } = params;
	try {
		const goal = await Goal.findById(goalId);
		const data = goal.actions.map((item) => {
			return {
				id: item.id,
				name: item.name,
				remark: item.remark,
				startTime: new Date(item.startTime).getTime(),
				endTime: new Date(item.endTime).getTime()
			};
		});
		ctx.body = {
			status: true,
			data
		};
	} catch (e) {
		throw new Error('查询失败', e);
	}
};

const addAction = async (ctx) => {
	const params = ctx.request.body;
	const { goalId, name, startTime, endTime, remark } = params;
	try {
		const goal = await Goal.findById(goalId);
		const { actions } = goal;
		await Goal.updateOne(
			{
				_id: goalId
			},
			{
				actions: [...actions, { name, startTime, endTime, remark }]
			}
		);
		ctx.body = {
			status: true,
			message: '创建action成功'
		};
	} catch (e) {
		throw new Error('创建失败', e);
	}
};

const editAction = async (ctx) => {
	const params = ctx.request.body;
	const { goalId, id, name, remark } = params;
	try {
		const goal = await Goal.findById(goalId);
		const action = goal.actions.id(id);
		action.name = name;
		action.remark = remark;
		await goal.save();
		ctx.body = {
			status: true,
			message: '更新action成功'
		};
	} catch (e) {
		throw new Error('更新失败', e);
	}
};

const getGoalList = async (ctx) => {
	try {
		let goals = await Goal.find({});
		goals = goals.map((item) => {
			return {
				id: item._id,
				status: item.status,
				name: item.name,
				actions: item.actions
			};
		});
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
				message: '创建失败，该目标已存在'
			};
			return;
		}
		await Goal.create({
			userId: user._id,
			name
		});
		ctx.body = {
			status: true,
			message: '创建成功'
		};
	} catch (e) {
		throw new Error('创建失败', e);
	}
};

const completeGoal = async (ctx) => {
	const params = ctx.request.body;
	const { id } = params;
	try {
		const goal = await Goal.findById(id);
		await Goal.updateOne(
			{
				_id: id
			},
			{
				status: 1
			}
		);
		console.log(goal);
		ctx.body = {
			status: true,
			message: '编辑成功'
		};
	} catch (e) {
		throw new Error('编辑失败', e);
	}
};

module.exports = {
	getActionList,
	addAction,
	editAction,
	getGoalList,
	createGoal,
	completeGoal
};
