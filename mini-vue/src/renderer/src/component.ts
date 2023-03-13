import { ref, shallowRef } from '@vue/reactivity'
import { onUnmounted } from './life-cycle'

// defineAsyncComponent 函数用于定义一个异步组件，接收一个异步组件加载器作为参数
export function defineAsyncComponent(options) {
  // options 可以是配置项，也可以是加载器
  if (typeof options === 'function') {
    // 如果 options 是加载器，则将其格式化为配置项形式
    options = {
      loader: options,
    }
  }
  const { loader } = options
  // 一个变量，用来存储异步加载的组件
  let InnerComp = null

  // 记录重试次数
  let retries = 0
  // 封装 load 函数用来加载异步组件
  function load() {
    return (
      loader()
        // 捕获加载器的错误
        .catch((err) => {
          // 如果用户指定了 onError 回调，则将控制权交给用户
          if (options.onError) {
            // 返回一个新的 Promise 实例
            return new Promise((resolve, reject) => {
              // 重试
              const retry = () => {
                resolve(load())
                retries++
              }
              // 失败
              const fail = () => reject(err)
              // 作为 onError 回调函数的参数，让用户来决定下一步怎么做
              options.onError(retry, reject, retries)
            })
          } else {
            throw err
          }
        })
    )
  }

  // 返回一个包装组件
  return {
    name: 'AsyncComponentWrapper',
    setup() {
      // 异步组件是否加载成功
      const loaded = ref(false)
      // 代表是否超时，默认为 false，即没有超时
      const timeout = ref(false)
      // 定义 error，当错误发生时，用来存储错误对象
      const error = shallowRef(null)
      // 一个标志，代表是否正在加载，默认为 false
      const loading = ref(false)
      let loadingTimer = null
      // 如果配置项中存在 delay，则开启一个定时器计时，
      // 当延迟到时后将loading.value 设置为 true
      if (options.delay) {
        loadingTimer = setTimeout(() => {
          loading.value = true
        }, options.delay)
      } else {
        // 如果配置项中没有 delay，则直接标记为加载中
        loading.value = true
      }
      // 执行加载器函数，返回一个 Promise 实例
      // 加载成功后，将加载成功的组件赋值给 InnerComp，并将 loaded 标记为 true，代表加载成功
      loader()
        .then((c) => {
          InnerComp = c
          loaded.value = true
        })
        .catch((err) => {
          // 添加 catch 语句来捕获加载过程中的错误
          error.value = err
        })
        .finally(() => {
          loading.value = false
          // 加载完毕后，无论成功与否都要清除延迟定时器
          clearTimeout(loadingTimer)
        })
      let timer = null
      if (options.timeout) {
        // 如果指定了超时时长，则开启一个定时器计时
        timer = setTimeout(() => {
          // 超时后创建一个错误对象，并复制给 error.valu
          const err = new Error(
            `Async component timed out after${options.timeout}ms.`
          )
          error.value = err
          // 超时后将 timeout 设置为 true
          timeout.value = true
        }, options.timeout)
      }
      // 包装组件被卸载时清除定时器
      onUnmounted(() => clearTimeout(timer))
      // 占位内容
      const placeholder = { type: Text, children: '' }

      return () => {
        // 如果异步组件加载成功，则渲染该组件，否则渲染一个占位内容
        if (loader.value) {
          // 如果组件异步加载成功，则渲染被加载的组件
          return { type: InnerComp }
        } else if (error.value && options.errorComponent) {
          // 只有当错误存在且用户配置了 errorComponent 时才展示 Error组件，
          // 同时将 error 作为 props 传递
          return { type: options.errorComponent, props: { error: error.value } }
        } else if (loading.value && options.loadingComponent) {
          // 如果异步组件正在加载，并且用户指定了 Loading 组件，则渲染Loading 组件
          return { type: options.loadingComponent }
        } else if (timeout.value) {
          // 如果加载超时，并且用户指定了 Error 组件，则渲染该组件
          return options.errorComponent
            ? { type: options.errorComponent }
            : placeholder
        }
        return placeholder
      }
    },
  }
}
