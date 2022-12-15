const CreateButton = function (html) {
  this.html = html
  this.init()
}
CreateButton.prototype.init = function () {
  const button = document.createElement('button')
  button.innerHTML = this.html
  document.body.appendChild(button)
}

const ProxySingletonCreateButton = (function () {
  let instance = null

  return function (html) {
    if (instance === null) {
      instance = new CreateButton(html)
    }
    return instance
  }
})()

const a = new ProxySingletonCreateButton('aaa')
const b = new ProxySingletonCreateButton('bbb')

console.log(a === b)
