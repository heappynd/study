module.exports = function (content) {
  const options = this.getOptions({
    type: 'object',
    properties: {
      author: {
        type: 'string',
      },
    },
    additionalProperties: false,
  })

  const prefix = `
    /**
     * Author ${options.author}
     * /
  `
  // return prefix + content
  return content
}
