const userModel = require('../models/users')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册
const register = async (ctx, next) => {
  ctx.verifyParams({
    username: { type: "string", required: true },
    password: { type: "string", required: true }
  })

  const { username, password } = ctx.request.body

  // 获取用户的
  const user = await userModel.findOne({ username })
  if (user) {
    ctx.throw(409, "用户名已存在")
  }

  // 生成uuid
  // const userId = uuidv4()

  await userModel.create({
    // userId,
    username,
    password
  })

  ctx.body = {
    // userId,
    username,
    password
  }
}

// 登录
const login = async (ctx, next) => {
  ctx.verifyParams({
    username: { type: "string", required: true },
    password: { type: "string", required: true }
  })
  // 获取用户的
  const user = await userModel.findOne(ctx.request.body)

  if (!user) {
    ctx.throw(401, '用户名或者密码不正确')
  }

  const { _id, username } = user

  const token = jwt.sign({ _id, username }, config.secret, { expiresIn: '1d' })

  ctx.body = { token }
}

// 删除
const del = async (ctx, next) => {
  ctx.verifyParams({
    id: { type: "string", required: true }
  })
  const user = await userModel.findByIdAndRemove(ctx.request.body.id)
  if (!user) {
    ctx.throw(404, "用户不存在")
  }
  ctx.status = 204
}

// 更新
const update = async (ctx, next) => {
  ctx.verifyParams({
    id: { type: "string", required: true },
    username: { type: "string", required: false }
  })
  const user = await userModel.findByIdAndUpdate(ctx.request.body.id, ctx.request.body)
  if (!user) {
    ctx.throw(404, "用户不存在");
  }
  ctx.body = user
}

module.exports = {
  register,
  update,
  login,
  del
}
