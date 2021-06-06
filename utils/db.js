const mongoose = require('mongoose')
const config = require('../config')

mongoose.connect(config.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const db = mongoose.connection

db.on('error', function () {
  console.error('数据库连接错误!')
})
db.once('open', function () {
  console.log('数据库打开成功')
})
