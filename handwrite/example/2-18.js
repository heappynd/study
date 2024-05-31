let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值得 key 约定为 true
}
*/
/**
 *
 * @param {string} url
 */
function parseParam(url) {
  const searchStr = url.split('?')[1]
  const params = new Map()
  const group = searchStr.split('&')
  group.forEach((line) => {
    let [key, value] = line.split('=')
    value = decodeURI(value)
    const originValue = params.get(key)
    if (originValue) {
      params.set(key, Array.isArray(originValue) ? [...originValue, value] : [originValue, value])
    } else {
      params.set(key, value == "undefined" ? true : value)
    }
  })
  console.log('params', params)
}
