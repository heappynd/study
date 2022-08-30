import { Option } from './tree'

function bfs(root: Option) {
  const queue = [root]
  while (queue.length > 0) {
    const n = queue.shift()!
    console.log(n.value)
    n.children.forEach((child) => {
      queue.push(child)
    })
  }
}

console.log('----')

bfs(Option)
