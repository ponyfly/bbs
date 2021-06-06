const Router = require('koa-router')
const controllers = require('../controllers')
const jwtMiddleWare = require('../middlewares/jwt')

const router = new Router()

router.prefix('/api/v1/user')

router.post('/register', controllers.user.register)

router.post('/login', controllers.user.login)

router.post('/delete', jwtMiddleWare, controllers.user.del)

router.post('/update', jwtMiddleWare, controllers.user.update)

module.exports = router

