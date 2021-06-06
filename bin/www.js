#!/usr/bin/env node
const app = require('../app')
const config = require('../config')
require('../utils/db')

app.listen(config.port, () => {
  console.log(`Koa is listening on port ${config.port}`)
})
