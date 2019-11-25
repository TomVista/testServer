const router = new (require('koa-router'))()
const request = require('request-promise')
const users =require('../models/users') 

const appid = 'wxdc6a4e0b2804693b'
const appSecret = '9cbb00ccabc5cebe0d632725816ace1f'
const sha1 = require('sha1')

router.get('/getOpenid', async (ctx, next) => {
  const pnum = 17803267922
  const uname = '赵雷涛'
  const code = ctx.query.code
  const tUrl = `https://qiuapi.meitulv.com/virtual_open`
  const res = await request({
    method: 'post',
    uri: tUrl,
    form: {
      PNUM: pnum,
      UNAME: uname,
      DAYS: '365',
      UID: pnum,
      QIUCODE: '356a192b7913b04c54574d18c28d4111'
    },
    headers: {
      SINGS: sha1(`48e0e503e262e9b7416de7c308b17e${uname}356a192b7913b04c54574d18c28d4111${pnum}`).slice(2, 34)
    },
    rejectUnauthorized: false
  })
  ctx.body = res
})

router.get('/mongodb', async (ctx, next) => {

 const res =await users.findOne({
  _id:'5ddb74020c1cb79f35d42264'
})

  ctx.body = JSON.stringify(res)
})


module.exports = router
