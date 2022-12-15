import { getSingle } from './getSingle'

const button = document.createElement('button')
button.textContent = 'Click me!'
button.addEventListener('click', () => {
  const div = createSingleLoginLayer()
  div.style.display = 'block'
  const iframe = createSingleIframe()
})

document.body.appendChild(button)

// logic 1
const createLoginLayer = function () {
  const div = document.createElement('div')
  div.innerHTML = '我是登录浮窗'
  div.style.display = 'none'
  document.body.appendChild(div)
  return div
}

const createSingleLoginLayer = getSingle(createLoginLayer)

const createIframe = function (src) {
  const iframe = document.createElement('iframe')
  iframe.src = 'https://www.bilibili.com'
  document.body.appendChild(iframe)
  return iframe
}
const createSingleIframe = getSingle(createIframe)

// demo 1->jq .one 2->vue .once

const bindEvent = getSingle(() => {
  console.log('bind')
  return true // !为了在判断的时候
})

const render = function () {
  console.log('render List')
  bindEvent()
}

render()
render()
render()
