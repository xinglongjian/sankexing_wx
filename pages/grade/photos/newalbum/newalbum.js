// pages/grade/photos/newalbum/newalbum.js
var album = require('../../../../request/album.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeId: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var gradeId = options.gradeId;
    // this.setData({
    //   gradeId: gradeId
    // })
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

  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    formData.gradeId = that.data.gradeId;
    formData.createdUserId = app.globalData.userId;
    console.log(formData)
    album.addAlbum(formData, function (e) {
      wx.navigateBack();
      console.log("success")
    }, function () {
      console.log("add school fail");
    });
  },
})