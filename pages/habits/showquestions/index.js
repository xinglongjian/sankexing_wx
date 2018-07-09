// pages/habits/showquestions/index.js
var habitapi = require('../../../request/habit.js')
var account = require('../../../request/accounts.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
      habitId:0,
      childId:0,
      child:null,
      title:'',
      questions:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var habitId = options.habitId;
    var childId = options.childId;
    this.setData({
      habitId: habitId,
      childId: childId
    })
    //
    var that =this;
    //that.getChild(that);
    that.getQuestions(that);
  },

  getChild:function(that) {
    account.getUserById(that.data.childId,function(res){
      that.setData({
        child:res.data
      })
    },function(res){})
  },

  getQuestions:function(that) {
    habitapi.getHabitQuestionDetail(that.data.habitId,function(res){
      that.setData({
        title:res.data.title,
        questions:res.data.questions
      })
    })
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