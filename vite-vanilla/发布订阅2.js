const PubSub = {
  map: new Map(),
  publish(type, data) {
    // debugger
    if (!this.map.has(type)) {
      return console.log('not registered: ' + type)
    }
    this.map.get(type).forEach((fn) => {
      fn(data)
    })
  },
  subscribe(type, cb) {
    if (!this.map.has(type)) {
      this.map.set(type, [cb])
    } else {
      this.map.get(type).push(cb)
    }
  },

  unsubscribe(type, cb) {
    if (!this.map.has(type)) {
      return console.log('not registered:' + type)
    }
    if (!cb) {
      // cancel all callbacks of type
      this.map.set(type, [])
    } else {
      this.map.set(
        type,
        this.map.get(type).filter((item) => item !== cb)
      )
    }
  },
}

// 订阅处理事件
function testA(args) {
  console.log('testA', args)
}

PubSub.subscribe('A', testA)
PubSub.subscribe('A', (args) => {
  console.log('testB', args)
})

setTimeout(() => {
  PubSub.unsubscribe('A', testA)
  // PubSub.publish('C')
}, 500)

setTimeout(() => {
  PubSub.publish('A', 'it payload')
  // PubSub.publish('C')
}, 1000)
