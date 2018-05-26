// pages/grade/photos/album/album.js
var album = require('../../../../request/album.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    albums: [
    ],
    gradeId: 0
  },

  addAlbum: function (e) {
    console.log('dddd')
    wx.navigateTo({
      url: '/pages/grade/photos/newalbum/newalbum',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gradeId = options.gradeId;
    var that = this;
    that.setData({
      gradeId: gradeId
    })
    
    album.getSimpleAlbum(that.data.gradeId, function (res) {
      console.log(res)
      that.setData({
        albums: res.data
      })
    }, function () { })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  selectAlbum:function(e) {
    var name = e.currentTarget.dataset.name;
    let pages = getCurrentPages();//当前页面
    let prevPage = pages[pages.length - 2];//上一页面
    console.log(e)
    prevPage.setData({//直接给上移页面赋值
      albumName: name
    });
    wx.navigateBack({    
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    album.getSimpleAlbum(that.data.gradeId, function (res) {
      console.log(res)
      that.setData({
        albums: res.data
      })
    }, function () { })
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