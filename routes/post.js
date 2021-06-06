const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleWare = require('../middlewares/jwt')

const router = new Router()

router.prefix('/api/v1/post')

// 发布
router.post('/publish', jwtMiddleWare, controllers.post.publish)

// 查询
router.post('/query', controllers.post.queryPosts)

// 根据id查询帖子
router.post('/queryPostById', controllers.post.checkPostExist, controllers.post.queryPostById)

module.exports = router
