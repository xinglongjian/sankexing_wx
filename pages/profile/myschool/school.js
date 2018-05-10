// pages/profile/school/school.js
const teacher = require('../../../request/teacher.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schools: []
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
    var that = this;
    var teacherId = app.globalData.userId;
    console.log(teacherId)
    teacher.getSchools(teacherId, function (res) {
      console.log(res)
      that.setData({
        schools: res.data
      })
    }, function () {

    });
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
  
  },
  navToSearchSchool: function () {
    wx.navigateTo({
      url: '/pages/school/search_school/search_school?type=teacher',
    })
  },
  navToSchool: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/school/index?id=' + id,
    })
  }
})