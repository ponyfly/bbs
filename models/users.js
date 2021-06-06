const mongoose = require('mongoose')

const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false, // 在定义schema规则的时候就规定查询的时候不返回password
    required: true
  },
  posts: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    select: false
  },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    select: false
  },
}, {
  timestamps: {
    createdAt: 'createdTime',
    updatedAt: 'updateTime',
    versionKey: false // 不需要__v
  }
})

UserSchema.set('toObject', { getters: true });

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel
