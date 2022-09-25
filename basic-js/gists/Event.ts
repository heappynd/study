export const x = 1

// 第三个参数 是否捕获 默认值false
window.addEventListener('click', () => {
  console.log('window click')
})
document.addEventListener('click', () => {
  console.log('document click')
})
document.documentElement.addEventListener('click', () => {
  console.log('html click')
})
document.body.onclick = function () {
  console.log('body click')
}

document.getElementById('myDiv')?.addEventListener('click', function (event) {
  // console.log(this.id)
  console.log('myDiv click')

  event.eventPhase === Event.AT_TARGET
})
