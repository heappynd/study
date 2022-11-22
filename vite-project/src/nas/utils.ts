const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
/**
 * 转换存储单位
 * @description 保留两位小数并根据数据大小在EB、PB、TB、GB、MB、KB间切换。
 * 切换规则:小单位下数值>=1024，则切换成大一级单位。
 * 如1013.99GB，则维持GB显示。1024GB，则换成1TB展示
 * @param { number } storage 传入单位为 B
 */
export function covertStorageUnit(storage: number | string, unit = 'B') {
  if (storage === '-') return storage
  if (storage === '0' || storage === 0) return '0'
  storage = Number(storage)
  if (typeof storage !== 'number' && isNaN(storage)) {
    console.error('error: not a number')
    return '0'
  }
  let count = units.indexOf(unit)
  function convertUnit(storage: number): number {
    if (storage >= 1024) {
      count++
      return convertUnit(storage / 1024)
    } else if (storage < 1) {
      count--
      return convertUnit(storage * 1024)
    } else {
      return storage
    }
  }
  return convertUnit(storage).toFixed(2) + ' ' + units[count]
}
