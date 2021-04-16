const Router = require('koa-router');
const Action = require('./action');

const router = new Router();

router.post('/login', Action.login);
router.post('/addUser', Action.addUser);

module.exports = router;
