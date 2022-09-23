export const x = 1

let list = document.getElementById('list') as HTMLUListElement
console.log(list.childNodes)
const li = document.createElement('li')
li.innerText = '🙏'
let replace = list.replaceChild(li, list.firstChild!)
console.log(replace)
list.removeChild(list.lastChild!)

list.appendChild(document.createTextNode(''))

console.log(list.childNodes)

// clone
// const clone = list.cloneNode(true)
// console.log(clone)
// document.querySelector('#app')?.insertBefore(clone, null)

// list.normalize()
console.log(list.childNodes)

console.log(document.doctype, document.documentElement)

// document.applets
console.log(document.images)

console.log(document.implementation.hasFeature('XML', '1.0'))

// document.open()
// document.write('cc')
// document.close()

console.log(list.attributes)

const children = []
for (let i = 0; i < list.childNodes.length; i++) {
  const childNode = list.childNodes[i]
  if (childNode.nodeType === Node.ELEMENT_NODE) {
    children.push(childNode)
  }
}
console.log(children)
