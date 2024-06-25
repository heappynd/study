class BannerPlugin {
  constructor(options = {}) {
    this.options = options
  }

  apply(compiler) {
    debugger
    compiler.hooks.emit.tapPromise('BannerPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        const assets = Object.keys(compilation.assets).filter((assetPath) => {
          const ext = assetPath.slice(assetPath.lastIndexOf('.'))
          return ['.css', '.js'].includes(ext)
        })

        // 只保留js、css
        console.log(assets)

        const prefix = `
        /**
         * Author: ${this.options.author}
         * /
        `

        assets.forEach((asset) => {
          const source = compilation.assets[asset].source()

          const content = prefix + source

          compilation.assets[asset] = {
            // 最终资源输出时，调用source方法，返回值就是资源具体的内容
            source() {
              return content
            },
            size() {
              return content.length
            },
          }
        })

        resolve()
      })
    })
  }
}

// const { BannerPlugin } = require("webpack")

module.exports = BannerPlugin
