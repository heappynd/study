// index.js
Page({
  data: {
    id: 1,
    school: '大学',
    obj: {
      name: 'tom',
    },
    isChecked: false,
    count: 0,
    userInfo: {
      name: '',
      age: 0,
    },
    list: [
      { id: 1, name: 'one' },
      { id: 2, name: 'two' },
    ],
    value: "12345",
    checked: false
  },

  updateList() {
    // this.setData({
    //   list: [1, 2, 3, 4, 5],
    // })
    // this.setData({
    // 'list[1]': 100,
    // 'list[0].name': 'music',
    // })
  },

  updateUserInfo() {
    // this.setData({
    //   'userInfo.name': 'tom',
    //   'userInfo.age': 10,
    // })
    // delete this.data.userInfo.age
  },

  add() {
    console.log(this.data.count)
    // 1 更新数据 2 驱动试图更新
    this.setData({
      count: this.data.count + 1,
    })
    // console.log(this.data.count)
  },

  handler(event) {
    console.log('event ....', event)
  },

  handleInput(event) {
    console.log(event)
    console.log(event.detail.value)
  },

  btnHandler(event) {
    // currentTarget 事件绑定者
    // target 事件触发者
    console.log('btnHandler', event.currentTarget.dataset)
    // mark获取的是事件触发者 到绑定者的所有数据
    console.log('btnHandler', event.mark)
  },

  parentHandler() {
    console.log('parentHandler')
  },
})
