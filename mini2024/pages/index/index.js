Page({
  /**
   * 页面的初始数据
   */
  data: {
    todos: [],
  },

  async deleteData() {
    const res = await wx.showModal({
      title: '提示',
      content: '是否删除该商品',
    })
    console.log(res)
    const { confirm, cancel } = res
    if (confirm) {
      wx.showToast({
        title: '删除成功',
        icon: 'none',
        duration: 2000,
      })
    } else {
      wx.showToast({
        title: '取消删除',
        icon: 'error',
        duration: 2000,
      })
    }
  },

  getData() {
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    wx.request({
      url: 'https://jsonplaceholder.typicode.com/todos',
      method: 'GET',
      data: {},
      header: {},
      success: (res) => {
        console.log('success', res)
        if (res.statusCode === 200) {
          this.setData({
            todos: res.data,
          })
        }
      },
      fail(err) {
        console.log('fail', err)
      },
      complete() {
        console.log('complete')
        wx.hideLoading()
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
