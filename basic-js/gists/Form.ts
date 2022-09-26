const el = document.querySelector('form')!

// const form = document.forms['myForm']
// console.log(el === form)

console.dir(el.elements)
console.log(el.enctype)
console.log(el.method)
console.log(el.name)
console.log(el.target)
console.log(el.acceptCharset)
console.log(el.action)

el.reset()

el.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(el.elements)
})

const input = el.elements[0] as HTMLInputElement

input.addEventListener('select', (e) => {
  console.log(e)
  console.log(input.selectionStart)
  console.log(input.selectionEnd)
  console.log(input.value.substring(input.selectionStart, input.selectionEnd))
})
input.addEventListener('focus', (e) => {
  input.setSelectionRange(0, 3)
})
