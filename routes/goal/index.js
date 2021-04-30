const Router = require('koa-router');
const Action = require("./action");
const auth = require('../../middlewares/auth');

const router = new Router();

router.post("/GetGoalList", auth, Action.getGoalList);
router.post("/CreateGoal", auth, Action.createGoal);

router.post("/FinishAction", auth, Action.finishAction);
router.post("/GetActionList", auth, Action.getActionList);

module.exports = router;