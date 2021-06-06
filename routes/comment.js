const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleWare = require('../middlewares/jwt')

const router = new Router()

router.prefix('/api/v1/comment')

// 发布
router.post('/publish', jwtMiddleWare, controllers.comment.publish)

// 查询
router.post('/queryComments', controllers.comment.queryComments)

module.exports = router
