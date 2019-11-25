const route = require('koa-route')
const Koa = require('koa')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const websockify = require('koa-websocket')
const app = websockify(new Koa())
var cors = require('koa2-cors')
const index = require('./routes/index')
const users = require('./routes/users')

const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

const graphql = require('./graphql')

mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://127.0.0.1', { useNewUrlParser: true, useUnifiedTopology: true })


// error handler
onerror(app)
app.use(cors())
app.use(graphql.getMiddleware())
console.log(`🚀 Server ready at http://localhost:3001${graphql.graphqlPath}`)
// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'text'],
  extendTypes: {
    text: ['application/x-www-form-urlencoded'] // will parse application/x-javascript type body as a JSON string
  }
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  ctx.req.on('end', (data) => {
    console.log('end')
  })
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// websocket
app.ws.use(function (ctx, next) {
  ctx.websocket.on('connection', res => {
    console.log(res)
  })
  ctx.websocket.on('message', res => {
    console.log(res)
    ctx.websocket.send('got you message')
  })
  return next(ctx)
})


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
