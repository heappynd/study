const syncLoader = function (content, map, meta) {
  console.log('同步loader')
  console.log(content)
  console.log(map)
  console.log(meta)
  // return content
  // this.callback(new Error('错误原因'), content)

  this.callback(null, content, map, meta)

  // this.getOptions(schema)
}

module.exports = syncLoader
