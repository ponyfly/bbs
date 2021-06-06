const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = new Schema({
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  commenterId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false
  }
}, {
  timestamps: { createdAt: 'createdTime', updatedAt: 'updateTime' }
})

CommentSchema.set('toObject', { getters: true });

const CommentModel = mongoose.model('Comment', CommentSchema)
module.exports = CommentModel
