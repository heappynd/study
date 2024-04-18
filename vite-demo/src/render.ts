let timer

export function render() {
  timer = setInterval(() => {
    index++
    document.querySelector('#app')!.innerHTML = 'hello world' + index
  }, 1000)
}

// let index = 0
let index =
  import.meta.hot.data.cache && import.meta.hot.data.cache.getIndex ? import.meta.hot.data.cache.getIndex() : 0

// const timer = setInterval(() => {
//   console.log(++index)
// }, 1000)

if (import.meta.hot) {
  import.meta.hot.data.cache = {
    getIndex() {
      return index
    },
  }

  import.meta.hot.dispose(() => {
    // 清理工作
    console.log('dispose')
    if (timer) {
      clearInterval(timer)
    }
  })
}
