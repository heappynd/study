const json = {
  a: {
    b: {
      c: 1,
    },
  },
  d: {
    e: 2,
  },
}

const path = ['a', 'b', 'c']

function findValByPath(json, path) {
  let curr = json
  for (let i = 0; i < path.length; i++) {
    curr = curr[path[i]]
  }
  return curr
}
console.log(findValByPath(json, path))

const arr = [...new Set([1, 2, 3, 1, 2, 3])]

const set1 = new Set([1, 2, 3])
const set2 = new Set([2])
const intersection = new Set([...set1].filter((item) => set2.has(item)))
