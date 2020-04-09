const router= require('koa-router')();
const userRouter = require('./user');
const todoRouter = require('./todoList')

// router.use 为路由分层，在根路由中注册子路由
router.use('/api', userRouter.routes())
router.use('/api', todoRouter.routes())

module.exports = router
