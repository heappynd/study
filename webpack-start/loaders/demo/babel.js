const babel = require('@babel/core')

module.exports = function (content) {
  const options = this.getOptions({
    type: 'object',
    properties: {
      preset: {
        type: 'array',
      },
    },
    additionalProperties: true,
  })

  const callback = this.async()

  babel.transform(content, options, (err, result) => {
    if (err) {
      callback(err)
    } else {
      callback(null, result.code)
    }
  })
}
