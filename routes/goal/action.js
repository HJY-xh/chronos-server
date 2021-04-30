const {Goal, Action} = require("../../models/goal.modal");

const finishAction = async(ctx) => {

}

const getActionList = async(ctx) => {
    
}


const getGoalList = async (ctx) => {
	const params = ctx.request.body;
    // const {}
}

const createGoal = async (ctx) => {
	const params = ctx.request.body;
    const user = ctx.state.user;
    const { name } = params;
    try {
        await Goal.create({ 
            userId: user._id,
            name
         });
        ctx.status = 200;
        ctx.body = {
			status: true,
            message: "创建成功"
		};
    } catch(e){
        throw new Error('创建失败', e);

    }
}

module.exports = {
    finishAction,
    getActionList,
    getGoalList,
    createGoal
}