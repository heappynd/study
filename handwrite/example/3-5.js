class EventCenter {
  handers = {}

  addEventListener(type, handler) {
    if (!this.handers[type]) {
      this.handers[type] = []
    }
    this.handers[type].push(handler)
  }

  dispatch(type, params) {
    if (!this.handers[type]) {
      return new Error('该事件未注册')
    }
    this.handers[type].forEach((handler) => {
      handler(...params)
    })
  }

  removeEventListener(type, handler) {
    if (!this.handlers[type]) {
      return new Error('事件无效')
    }
    if (!handler) {
      // 移除事件
      delete this.handlers[type]
    } else {
      const index = this.handlers[type].findIndex((el) => el === handler)
      if (index === -1) {
        return new Error('无该绑定事件')
      }
      // 移除事件
      this.handlers[type].splice(index, 1)
      if (this.handlers[type].length === 0) {
        delete this.handlers[type]
      }
    }
  }
}
