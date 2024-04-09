// components/custom-checkbox/custom-checkbox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // label: String,
    label: {
      type: String,
      value: '',
    },
    position: {
      type: String,
      value: 'right',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isChecked: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateChecked() {
      console.log(this.properties);
      this.setData({
        isChecked: !this.data.isChecked,
      })
    },
  },
})
