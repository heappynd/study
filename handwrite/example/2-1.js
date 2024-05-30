dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd') // 2020/12/01
dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd') // 2020/04/01
dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日') // 2020年04月01日

/**
 *
 * @param {Date} d
 * @param {*} format
 */
function dateFormat(d, format) {
  let year = d.getFullYear()
  let month = d.getMonth() + 1
  let dd = d.getDate()

  month = month < 10 ? `0${month}` : month
  dd = dd < 10 ? `0${dd}` : dd

  console.log(format.replace('yyyy', year).replace('MM', month).replace('dd', dd))
}
