// pages/profile/childs/index.js
var account = require('../../../../request/accounts.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    childs:null
  },
  //切换到添加孩子页面
  navToAddChild:function() {
      wx.navigateTo({
        url: '/pages/profile/childs/addchild/addchild',
      })
  },

  getChild:function() {
    var userId = app.globalData.userId;
    console.log(userId)
    account.childGet(userId,function(e){
      console.log(e)
      this.setData({
        childs:e.data
      })
    },function(){

    });
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
    // 获取孩子
    var that = this;
    var userId = app.globalData.userId;
    console.log("userId:"+userId);
    account.childGet(userId, function (res) {
      console.log(res)
      that.setData({
        childs: res.data
      })
    }, function (e) {

    }, function (res) { });
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