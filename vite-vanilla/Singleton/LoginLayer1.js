const button = document.createElement('button')
button.textContent = 'Click me!'
button.addEventListener('click', () => {
  loginLayer.style.display = 'block'
})

document.body.appendChild(button)

// logic 1
const loginLayer = (function () {
  const div = document.createElement('div')
  div.innerHTML = '我是登录浮窗'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
})()
