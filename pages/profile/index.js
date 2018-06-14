// pages/profile/index.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    motto: 'Hello World',
    functions: [{
      name: '我的宝贝',
      url: '/pages/profile/childs/listchild/list'
    }, {
      name: '管理控制台',
      url: '/pages/admin/index'
    }, {
      name: '我的班级',
      url: '/pages/profile/mygrade/grade'
    },{
      name: '我的学校',
      url: '/pages/profile/myschool/school'
    }],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  navToFunc:function(e){
      var index = e.currentTarget.dataset.index;
      var url = this.data.functions[index].url;
      wx.navigateTo({
        url: url,
      })
  },
  // navToChilds: function () {
  //   wx.navigateTo({
  //     url: '/pages/profile/childs/listchild/list',
  //   })
  // },
  // navToAdmin: function () {
  //   wx.navigateTo({
  //     url: '/pages/admin/index',
  //   })
  // },
  // navToSchool: function () {
  //   wx.navigateTo({
  //     url: '/pages/profile/myschool/school',
  //   })
  // },
  // navToGrade: function () {
  //   wx.navigateTo({
  //     url: '/pages/profile/mygrade/grade',
  //   })
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
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