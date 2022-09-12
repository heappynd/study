import Router from 'koa-router'

const router = new Router()

router
  .get('/', (ctx, next) => {
    ctx.body = {
      a: [1, 2],
      query: ctx.query,
      qs: ctx.querystring,
    }
  })
  .post('/', (ctx) => {
    ctx.body = {
      body: ctx.request.body,
    }
  })
  .put('/:id', (ctx) => {
    console.log(ctx.params)
    ctx.body = {
      _id: ctx.params.id,
    }
  })

export default router
