function responseHandler(ctx) {
  if (ctx.result !== undefined) {
    ctx.type = 'json'
    ctx.body = {
      code: 0,
      data: ctx.result.data,
      msg: ctx.result.msg
    }
  }
}

module.exports = {
  responseHandler
}
