Page({
  /**
   * 页面的初始数据
   */
  data: {},

  setStorage() {
    wx.setStorageSync('key', { id: 1, username: 'zhangsan' })

    wx.setStorage({
      key: 'key3',
      data: { id: 2, username: 'lisi' },
    })

    wx.setStorageSync('key2', 1008)
  },
  async getStorage() {
    // console.log(wx.getStorageSync('key') === '')
    console.log(wx.getStorageSync('key') === '')
    console.log(wx.getStorageSync('key2'))

    const res = await wx.getStorage({ key: 'key3' })
    console.log(res.data)
  },
  removeStorage() {
    wx.removeStorageSync('key')

    wx.removeStorage({ key: 'key3' })
  },
  clearStorage() {
    wx.clearStorage()
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
