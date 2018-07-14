// pages/admin/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functions: [
      {
        name: '添加学校',
        url: '/pages/admin/addschool/addschool'
      }, {
        name: '添加班级',
        url: '/pages/admin/addschool/addschool'
      }, {
        name: '添加习惯大类',
        url: '/pages/admin/addhabittype/addhabittype'
      }, {
        name: '添加习惯',
        url: '/pages/admin/addhabit/addhabit'
      }, {
        name: '添加习惯问题',
        url: '/pages/admin/listhabitquestion/index'
      }, {
        name: '添加习惯关系',
        url: '/pages/admin/listhabitquestionrelation/index'
      }
    ]
  },
  navToFunc:function(e) {
    var index = e.currentTarget.dataset.index;
    var url = this.data.functions[index].url;
    wx.navigateTo({
      url: url,
    })
  },
  clearStorage:function(e) {
     wx.clearStorageSync();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})