const Router = require("koa-router");
const Action = require("./action");

const router = new Router();

router.post("/GetGoalList", Action.getGoalList);
router.post("/CreateGoal", Action.createGoal);

module.exports = router;