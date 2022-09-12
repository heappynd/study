import Router from 'koa-router'
import userRouter from './user.js'
import systemRouter from './system.js'

const router = new Router()

router.redirect('/', '/home')

router.get('/home', async (ctx) => {
  await ctx.render('home', {
    title: 'ejs4u',
  }) // async!!!
})

// 统一前缀
// router.prefix('/api')

// 路由级组件
router.use('/api/user', userRouter.routes(), userRouter.allowedMethods())
router.use('/api', systemRouter.routes(), systemRouter.allowedMethods())

export default router
