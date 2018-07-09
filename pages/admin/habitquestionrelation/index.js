// pages/admin/habitquestionrelation/index.js

var habit = require('../../../request/habit.js')
const Dialog = require('../../../third/zanui/dist/dialog/dialog.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    habitId: 0,
    title: '',
    questions: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var habitId = options.habitId;
    this.setData({
      habitId: habitId
    })
    var that = this;
    that.getQuestions(that)
  },
  getQuestions: function (that) {
    habit.getHabitQuestionRelationByHabitId(that.data.habitId, function (res) {
      console.log(res)
      that.setData({
        title: res.data.title,
        questions: res.data.questions == undefined ? [] : res.data.questions
      })
    })
  },

  navToAddQuestion: function (e) {
    var questionIds = []
    if (this.data.questions.length > 0) {
      for (var i = 0; i < this.data.questions.length; i++) {
        questionIds.push(this.data.questions[i].id)
      }
    }
    wx.navigateTo({
      url: '/pages/admin/selecthabitquestion/index?habitId=' + this.data.habitId + "&questionIds=" + questionIds.join(),
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
    var that = this;
    that.getQuestions(that)
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
  deleteQuestion: function (e) {
    console.log(e)
    var that = this;
    var relationid = e.currentTarget.dataset.id;
    Dialog({
      title: '提示',
      message: '确认要删除该记录？',
      selector: '#zan-base-dialog',
      showCancelButton: true
    }).then((res) => {
      if (res.type == 'confirm') {
        habit.deleteHabitQuestionRelation(that.data.habitId,relationid, function (res) {
          wx.showToast({
            title: '删除成功!',
          })
          that.getQuestions(that)
        })
      }
    }).catch(() => {
      console.log("concel")
    });

  }
})