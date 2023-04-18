let wrap = document.createElement('div')

let list = [
  { name: 'test', age: 30 },
  { name: 'test2', age: 30 },
  { name: 'test3', age: 30 },
]

list.forEach((item) => {
  let p = document.createElement('p')
  p.innerText = `${item.name} ${item.age}`
  wrap.appendChild(p)
})

export const addList = () => {
  document.body.appendChild(wrap)
}
