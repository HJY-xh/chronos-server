const Router = require('koa-router');
const Action = require('./action');
const auth = require('../../middlewares/auth');

const router = new Router();

router.post('/GetGoalList', auth, Action.getGoalList);
router.post('/CreateGoal', auth, Action.createGoal);
router.post('/CompleteGoal', auth, Action.completeGoal);

router.post('/GetActionList', auth, Action.getActionList);
router.post('/AddAction', auth, Action.addAction);
router.post('/EditAction', auth, Action.editAction);

module.exports = router;
