import { Plugin } from 'vite'

export default (enforce?: 'pre' | 'post'): Plugin => {
  return {
    name: 'test-plugin',
    enforce,
    // 在 dev server 启动的时候
    // buildStart() {
    //   console.log('buildStart', enforce)
    // },
    // 解析某个文件
    // resolveId() {
    //   console.log('resolveId', enforce)
    // },

    // load(id, options) {
    //   console.log('load', enforce, id)
    // },

    config(config, env) {
      console.log('config', config)

      // return {
      //   resolve: {
      //     alias: {
      //       '@aaa': '/src/aaa',
      //     },
      //   },
      // }
      return new Promise((resolve, reject) => {
        resolve({
          resolve: {
            alias: {
              '@bbb': '/src/bbb',
            },
          },
        })
      })
    },

    configResolved(config) {
      console.log('configResolved', config.resolve)
    },

    // configureServer(server) {
    //   console.log('server', server)

    //   server.middlewares.use((req, res, next) => {
    //     if (req.url === '/test') {
    //       res.end('Hello Vite Plugin')
    //     } else {
    //       next()
    //     }
    //   })
    // 放到最后面
    // return () => {
    //   server.middlewares.use((req, res, next) => {
    //     if (req.url === '/test') {
    //       res.end('Hello Vite Plugin')
    //     } else {
    //       next()
    //     }
    //   })
    // }
    // },

    // transformIndexHtml(html) {
    //   // index 内容
    //   console.log('html', html)
    //   // return html.replace('<title>Vite + TS</title>', '<title>Vite App - 1</title>')
    // },

    handleHotUpdate(ctx) {
      console.log('ctx', ctx)
      ctx.server.ws.send({
        type: 'custom',
        event: 'test',
        data: {
          hello: 'world',
        },
      })
    },
  }
}
