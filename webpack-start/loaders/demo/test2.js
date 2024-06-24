const asyncLoader = function (content, map, meta) {
  const callback = this.async()

  setTimeout(() => {
    console.log('异步loader')
    callback(null, content, map, meta)
  }, 1000)
}

module.exports = asyncLoader
