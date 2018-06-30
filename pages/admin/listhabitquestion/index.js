// pages/admin/listhabitquestion/index.js
var habitapi = require('../../../request/habit.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    keyword:''
  },
  /**
   * 处理搜索
   */
  handleSearchBlur: function (e) {
    var title = e.detail.detail.value
    if (title == undefined || title == '') {
      wx.showToast({
        title: '没有搜索值',
      })
      return
    }else{
      this.setData({
        keyword: title
      })
      var that = this;
      that.searchQuestion(that)
    }
    
  },
  searchQuestion:function(that) {
    habitapi.searchHabitQuestion(that.data.keyword, function (res) {
      that.setData({
        questions: res.data
      })
    }, function (res) { });
  },
  navToAddQuestion: function (e) {
    wx.navigateTo({
      url: '/pages/admin/addhabitquestion/index',
    })
  },
  navToEditQuestion: function (e) {
    var questionId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/admin/addhabitquestion/index?questionId=' + questionId,
    })
  },
  navToQuestionItem: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/admin/editquestionitem/index?questionId=' + id,
    })
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
    var that = this;
    if(that.data.keyword) {
      that.searchQuestion(that)
    }
   
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