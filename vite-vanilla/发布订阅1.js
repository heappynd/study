const PubSub = {
  list: [],
  publish() {
    this.list.forEach((item) => {
      item()
    })
  },
  subscribe(cb) {
    this.list.push(cb)
  },
  unsubscribe() {},
}

// 订阅处理事件
function testA() {
  console.log('testA')
}
function testB() {
  console.log('testB')
}

PubSub.subscribe(testA)
PubSub.subscribe(testB)

PubSub.publish()
