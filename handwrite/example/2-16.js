const source = [
  {
    id: 1,
    pid: 0,
    name: 'body',
  },
  {
    id: 2,
    pid: 1,
    name: 'title',
  },
  {
    id: 3,
    pid: 2,
    name: 'div',
  },
]

function toTree(source) {
  const map = new Map([])
  source.forEach((item) => {
    item.children = []
    map.set(item.id, item)
  })

  const result = []
  for (let i = 0; i < source.length; i++) {
    const element = source[i]
    const parentNode = map.get(element.pid)
    if (parentNode) {
      parentNode.children.push(element)
    } else {
      result.push(element)
    }
  }
  return result
}

console.log(toTree(source))
