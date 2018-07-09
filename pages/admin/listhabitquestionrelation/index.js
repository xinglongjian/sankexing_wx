// pages/admin/listhabitquestionrelation/index.js
var habit = require('../../../request/habit.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    habittypes: [],
    checkedType: 0,
    habitTypeName: '',
    habitName:'',
    habits:[],
    pageNum:1,
    allPageNum:1,
    lastPageDisabled:true,
    nextPageDisabled:true
  },
  handleSelectChange: function (e) {
    this.setData({
      checkedType: e.detail.value,
      habitTypeName: this.data.habittypes[e.detail.value].name
    })
  },
  habitNameBlur:function(e) {
    this.setData({
      habitName:e.detail.value
    })
  },
  queryHabitQuestions:function(e) {
    var typeId = this.data.habittypes[this.data.checkedType].id;
    var that =this;
    var habitName = that.data.habitName == ""?"all":that.data.habitName

    habit.getHabitPage(typeId, habitName,that.data.pageNum,function(res){
      console.log(res)
      that.setData({
        habits:res.data.datas,
        lastPageDisabled: res.data.pageNum <= 1,
        nextPageDisabled: res.data.pageNum >= res.data.allPageNum
      })
    })
  },
  navToHabitQuesRelation:function(e){
    var habitId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/admin/habitquestionrelation/index?habitId=' + habitId,
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
    habit.getAllType(function (res) {
      console.log(res);
      that.setData({
        habittypes: res.data
      });
      that.setData({
        habitTypeName: that.data.habittypes[that.data.checkedType].name
      })
    }, function (res) {
      console.log('fail');
    });
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