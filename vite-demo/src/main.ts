import { render } from './render'

render()

if (import.meta.hot) {
  // import.meta.hot.accept()

  // import.meta.hot.accept((newModule) => {
  //   // newModule.render()
  //   console.log(newModule)
  // })
  // import.meta.hot.accept()
  // 没有模块没有热更新去接受 页面会重新刷新去更新
  // import.meta.hot.accept(['./style.css'], () => {})
  // 只处理render热更新 而没有处理自己main.ts的更新
  import.meta.hot.accept(['./render'], ([newA]) => {
    // 手动更新
    newA.render()
  })
  // 原来的 decline
  // import.meta.hot.invalidate()
}
