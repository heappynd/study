// 全局变量，存储当前正在被初始化的组件实例
export let currentInstance = null
// 该方法接收组件实例作为参数，并将该实例设置为 currentInstance
export function setCurrentInstance(instance) {
  currentInstance = instance
}

export function onMounted(fn) {
  if (currentInstance) {
    // 将生命周期函数添加到 instance.mounted 数组中
    currentInstance.mounted.push(fn)
  } else {
    console.error('onMounted 函数只能在 setup 中调用')
  }
}

export function onUnmounted(fn) {
  
}
