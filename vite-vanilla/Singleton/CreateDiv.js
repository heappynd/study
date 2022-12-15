const CreateDiv = (function () {
  let instance = null

  const CreateDiv = function (html) {
    if (instance) {
      return instance
    }
    this.html = html
    this.init()
    return (instance = this)
  }

  CreateDiv.prototype.init = function () {
    const div = document.createElement('div')
    div.style.width = div.style.height = 80
    div.style.background = 'pink'
    div.innerHTML = this.html
    document.body.appendChild(div)
  }

  return CreateDiv
})()

const a = new CreateDiv('a')
const b = new CreateDiv('b')
const c = new CreateDiv('c')
console.log(a === b)
