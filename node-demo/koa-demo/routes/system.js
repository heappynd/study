import Router from 'koa-router'

const router = new Router()

router.post('/login', (ctx) => {
  // ctx.cookies.get('')
  // ctx.cookies.set('test-jksalksd2', '123456')
  // console.log(ctx.cookies)
  ctx.body = {
    cookies: '2',
  }
})

export default router
