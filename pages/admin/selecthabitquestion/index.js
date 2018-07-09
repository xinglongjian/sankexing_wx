// pages/admin/listhabitquestion/index.js
var habitapi = require('../../../request/habit.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    keyword: '',
    habitId: 0,
    checkedQuestion: [],
    myquestionIds:[]
  },
  /**
   * 处理搜索
   */
  handleSearchBlur: function(e) {
    var title = e.detail.detail.value
    if (title == undefined || title == '') {
      wx.showToast({
        title: '没有搜索值',
      })
      return
    } else {
      this.setData({
        keyword: title
      })
      var that = this;
      that.searchQuestion(that)
    }

  },
  searchQuestion: function(that) {
    habitapi.searchHabitQuestion(that.data.keyword, function(res) {
     
      var questions = res.data;
      for(var i = 0;i<questions.length;i++) {
        if (that.data.myquestionIds.indexOf(questions[i].id) != -1) {
          questions[i].added=true
        }else{
          questions[i].added=false
        }
      }
      that.setData({
        questions: questions
      })
    }, function(res) {});
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var habitId = options.habitId;
    var questionIds = options.questionIds;
    this.setData({
      habitId: habitId,
      myquestionIds: questionIds
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    if (that.data.keyword) {
      that.searchQuestion(that)
    }

  },
  changeCheckbox: function(e) {
    this.setData({
      checkedQuestion: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 把问题添加到习惯上
   */
  addQuestionToHabit: function(e) {
    if (this.data.checkedQuestion.length == 0) {
      wx.showToast({
        title: '请选择问题！',
      })
    } else {
      // 移除已选中的
      for (var i = 0; i < this.data.myquestionIds.length;i++){
         var index = this.data.checkedQuestion.indexOf(this.data.myquestionIds[i]);
         if (index > -1) {
           this.data.checkedQuestion.splice(index, 1);
         }
      }

      habitapi.addQutestionToHabit(this.data.habitId, this.data.checkedQuestion.join(),
        function(res) {
          wx.showToast({
            title: '添加成功！',
          })
          wx.navigateBack()
        });
    }

  }
})