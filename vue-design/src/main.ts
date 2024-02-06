export {}

const fn = (name: string) => {
  console.log('name', name)
}
const data = { foo: 1, fn: fn }

const obj = new Proxy(data, {
  apply(target, thisArg, argArray) {
    console.log('apply', target, thisArg, argArray)
  },
  get(target, key, receiver) {
    console.log('get', target, key, receiver)
    return target[key]
  },
  
})

// obj.fn('le')

console.log(Object.getOwnPropertyDescriptors(obj));
