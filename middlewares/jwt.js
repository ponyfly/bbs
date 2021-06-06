const koaJwt = require('koa-jwt')
const config = require('../config')

const jwtMiddleWare = koaJwt({ secret: config.secret })

module.exports = jwtMiddleWare
