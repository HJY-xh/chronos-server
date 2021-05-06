const Router = require('koa-router');
const Action = require('./action');
const auth = require('../../../middlewares/auth');

const router = new Router();

/**
 * @function 测试代码
 */
router.get('/test', Action.test);
router.get('/test2', auth, Action.test2);

router.post('/login', Action.login);

module.exports = router;
