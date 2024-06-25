class TestPlugin {
  constructor() {
    console.log('test plugin constructor')
  }

  apply(compiler) {
    debugger
    console.log('test plugin apply')

    compiler.hooks.environment.tap('TestPlugin', () => {
      console.log('在编译器准备环境时调用，时机就在配置文件中初始化插件之后。')
    })
    // 异步串行
    compiler.hooks.emit.tap('TestPlugin', (compilation) => {
      // console.log('输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器。')
      console.log(compilation.hash, 1)
    })

    compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
      // console.log('输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器。')
      setTimeout(() => {
        console.log(compilation.hash, 2)
        callback()
      }, 1000)
    })

    compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(compilation.fullHash, 3)
          resolve()
        }, 1000)
      })
    })

    // 异步并行
    compiler.hooks.make.tapPromise('TestPlugin', (compilation) => {
      compilation.hooks.seal.tap('TestPlugin', () => {
        console.log('compilation seal')
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('make')
          resolve()
        }, 1000)
      })
    })
  }
}

module.exports = TestPlugin
