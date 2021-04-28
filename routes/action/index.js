const Router = require("koa-router");
const Action = require("./action");
const auth = require('../../middlewares/auth');

const router = new Router();

router.post("/FinishAction", auth, Action.finishAction);
router.post("/GetActionList", auth, Action.getActionList);

module.exports = router;