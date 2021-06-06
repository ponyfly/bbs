const Koa = require('koa')
const bodyParser = require('koa-bodyparser')()
const parameter = require('koa-parameter')
const error = require('koa-json-error')
const logger = require('koa-logger')

const routes = require('./routes')

const app = new Koa()

// logger
app.use(logger())

app.use(
  error({
    postFormat: (e, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { ...rest }
  })
);
app.use(bodyParser)
app.use(parameter(app))

// Routes
routes(app)
// response
// app.use(responseHandler)

module.exports = app
