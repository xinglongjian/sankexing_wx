// pages/habits/showquestions/index.js
var habitapi = require('../../../request/habit.js')
var account = require('../../../request/accounts.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    habitId: 0,
    childId: 0,
    child: null,
    title: '',
    currQuestion: null,
    currIndex: 0,
    questions: [],
    lastDisabled: true,
    nextDisabled: true,
    checkedArray: [] //每个问题的选择数组
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
    var that = this;
    //that.getChild(that);
    that.getQuestions(that);
  },

  getChild: function (that) {
    account.getUserById(that.data.childId, function (res) {
      that.setData({
        child: res.data
      })
    }, function (res) { })
  },

  getQuestions: function (that) {
    habitapi.getHabitQuestionDetail(that.data.habitId, function (res) {
      //初始化选中数组
      console.log(res)
      var checked = []
      for (var i = 0; i < res.data.questions.length; i++) {
        var obj = {}
        obj.questionId = res.data.questions[i].questionId
        obj.itemId = 0
        checked.push(obj);
      }

      that.setData({
        title: res.data.title,
        questions: res.data.questions,
        checkedArray: checked,
        currQuestion: res.data.questions == undefined ? null : res.data.questions[0],
        nextDisabled: res.data.questions.length <= 1
      })
      that.checkItems(that);
    })
  },

  checkItems: function (that) {
    if (that.data.currQuestion != undefined) {
      for (var i = 0; i < that.data.currQuestion.items.length; i++) {
        for (var j = 0; j < that.data.checkedArray.length; j++) {
          if (that.data.checkedArray[j].questionId == that.data.currQuestion.questionId) {
            if (that.data.checkedArray[j].itemId == that.data.currQuestion.items[i].id) {
              that.data.currQuestion.items[i].checked = true
            } else {
              that.data.currQuestion.items[i].checked = false
            }
          }
        }
      }
    }
  },
  lastQuestion: function (e) {

    var id = this.data.currQuestion.questionId;
    for (var i = 0; i < this.data.checkedArray.length; i++) {
      if (this.data.checkedArray[i].questionId == id && this.data.checkedArray[i].itemId == 0) {
        wx.showToast({
          title: '还未选择!',
        })
        return;
      }
    }

    var currIndex = this.data.currIndex - 1;
    this.setData({
      currIndex: currIndex,
      currQuestion: this.data.questions[currIndex],
      lastDisabled: currIndex <= 0,
      nextDisabled: currIndex >= this.data.questions.length - 1
    })
    //
    this.checkItems(this);
  },
  nextQuestion: function (e) {
    var id = this.data.currQuestion.questionId;
    for (var i = 0; i < this.data.checkedArray.length; i++) {
      if (this.data.checkedArray[i].questionId == id && this.data.checkedArray[i].itemId == 0) {
        wx.showToast({
          title: '还未选择!',
        })
        return;
      }
    }

    var currIndex = this.data.currIndex + 1;
    this.setData({
      currIndex: currIndex,
      currQuestion: this.data.questions[currIndex],
      lastDisabled: currIndex <= 0,
      nextDisabled: currIndex >= this.data.questions.length - 1
    })
    //
    this.checkItems(this);
  },
  radioChange: function (e) {
    var id = this.data.currQuestion.questionId;
    for (var i = 0; i < this.data.checkedArray.length; i++) {
      if (this.data.checkedArray[i].questionId == id) {
        this.data.checkedArray[i].itemId = e.detail.value
      }
    }
    console.log(this.data.checkedArray)
    this.checkItems(this);
  },
  //提交
  formSubmit: function (e) {
    for (var i = 0; i < this.data.checkedArray.length; i++) {
      if (this.data.checkedArray[i].itemId == 0) {
        wx.showToast({
          title: '还有未选择!',
        })
        return;
      }
    }
    var checkedstr = JSON.stringify(this.data.checkedArray);
    //
    var byUserId = app.globalData.userId;
    console.log(this.data.childId, byUserId, this.data.habitId);
    habitapi.sumbitHabitRecord(this.data.childId, byUserId, this.data.habitId, checkedstr,function(res){
      wx.showToast({
        title: '记录成功！',
      })
      wx.navigateBack()
    },function(res){

    });


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