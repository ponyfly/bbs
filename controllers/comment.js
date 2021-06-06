const CommentModel = require('../models/comments')

// 发布
const publish = async (ctx, next) => {
  ctx.verifyParams({
    content: { type: "string", required: true },
    postId: { type: "string", required: true }
  })
  const commenterId = ctx.state.user._id
  const comment = await new CommentModel({
    ...ctx.request.body,
    commenterId,
  }).save()
  ctx.body = comment
}

// 根据帖子id查询评论
const queryComments = async ctx => {
  ctx.verifyParams({
    postId: { type: "string", required: true }
  })

  ctx.body = await CommentModel.find({ postId: ctx.request.body.postId })
    .populate('postId')
}

module.exports = {
  publish,
  queryComments
}
