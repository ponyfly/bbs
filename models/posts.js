const mongoose = require('mongoose')

const { Schema } = mongoose

const PostSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  poster: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    select: false
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    select: false
  },
  userViews: {
    type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  }
}, {
  timestamps: { createdAt: 'createdTime', updatedAt: 'updateTime' }
})

PostSchema.set('toObject', { getters: true, virtuals: false });

const PostModel = mongoose.model('Post', PostSchema)
module.exports = PostModel
