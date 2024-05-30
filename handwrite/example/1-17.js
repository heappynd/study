function shallowClone(obj) {
  if (!(typeof obj === 'object' && obj !== null)) {
    return obj
  }

  let newObject = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      newObject[key] = obj[key]
    }
  }
  return newObject
}
