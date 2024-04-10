// components/custom04/custom04.js
Component({
  lifetimes: {
    created() {},

    attached() {},

    ready() {},

    detached() {},

    moved() {},
  },

  pageLifetimes: {
    hide() {},
    resize() {},
    show() {},
  },

  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    num: 10,
    count: 100,
    obj: { name: 'Tom', age: 10 },
    arr: [1, 3, 4],
  },

  observers: {
    // num: (value) => {
    //   console.log(value)
    // },
    'num,count': (v1, v2) => {
      console.log(v1, v2)
    },

    'obj.**': (newObj) => {
      console.log(newObj)
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateData(e) {
      console.log(e)
      // this.setData({
      //   num: this.data.num + 1,
      //   count: this.data.count + 2,
      //   'obj.name': 'lily',
      // })
    },

    sendData() {
      this.triggerEvent('myevent', 2024)
    },
  },
})
