const PostModel = require('../models/posts')
const CommentModel = require('../models/comments')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cofing = require('../config')

// 发布
const publish = async (ctx, next) => {
  ctx.verifyParams({
    title: { type: "string", required: true },
    content: { type: "string", required: false }
  })
  const post = await new PostModel({
    ...ctx.request.body,
    poster: ctx.state.user._id
  }).save()
  ctx.body = post
}

// 查询
const queryPosts = async (ctx, next) => {
  let { pageSize, pageNum, title, content } = ctx.request.body
  let basicReg = ''
  pageNum = parseInt(pageNum)
  pageSize = parseInt(pageSize)
  let lists = await PostModel.find(
    {
      $or: [
        { title: { $regex: title || basicReg } },
        { content: { $regex: content || basicReg } }
      ]
    })
    .limit(pageSize)
    .skip((pageNum - 1) * pageSize)

  const result = []
  // 查找评论数
  for (let i = 0; i < lists.length; i++) {
    const item = (await lists[i]).toObject()
    const res = await CommentModel.find({ postId: item._id })
    item.commentNum = res.length
    item.uv = item.userViews ? item.userViews.length : 0
    result.push(item)
  }

  ctx.body = {
    lists: result,
    pageNum: pageNum,
    pageSize: lists.length
  }
}

// 根据id查询
const queryPostById = async (ctx) => {
  ctx.verifyParams({
    id: { type: "string", required: true }
  })

  // 查找帖子的uvs有没有当前的id,没有则+1
  const post = (await PostModel.findOne({ _id: ctx.request.body.id })).toObject();

  const { authorization = "" } = ctx.request.header
  const token = authorization.replace("Bearer ", "")
  const user = jwt.decode(token, cofing.secret)
  if (user && user._id && post.userViews && !post.userViews.includes(user._id)) {
    await PostModel.findByIdAndUpdate(
      ctx.request.body.id,
      { $push: { userViews: mongoose.Types.ObjectId(user._id) } }
    )
  }
  ctx.body = post
}

const checkPostExist = async (ctx, next) => {
  const post = await PostModel.findById(ctx.request.body.id)

  if (!post) {
    ctx.throw(404, "帖子不存在")
  }
  await next()
}

module.exports = {
  publish,
  queryPosts,
  queryPostById,
  checkPostExist
}
