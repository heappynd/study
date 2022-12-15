const button = document.createElement('button')
button.textContent = 'Click me!'
button.addEventListener('click', () => {
  const div = createLoginLayer()
  div.style.display = 'block'
})

document.body.appendChild(button)

// logic 1
const createLoginLayer = (function () {
  let div = null

  return function () {
    if (!div) {
      div = document.createElement('div')
      div.innerHTML = '我是登录浮窗'
      div.style.display = 'none'
      document.body.appendChild(div)
    }

    return div
  }
})()
