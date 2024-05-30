import { cloneDeep as _cloneDeep } from 'lodash-es'

function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

function deepClone(obj) {
  if (!isObject(obj)) {
    return obj
  }
  let newObject = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObject[key] = deepClone(obj[key])
    }
  }
  return newObject

  // return JSON.parse(JSON.stringify(obj))
}

const o1 = {
  a: 1,
  b: [],
  c: undefined,
  d: null,
  f: Symbol(),
  g: 100n,
  h: {
    i: 0,
  },
}
const o2 = deepClone(o1)
o1.h.i = -1000
console.log('o2', o2)
