// pages/habits/addhabit/addhabit.js
var habit = require('../../../request/habit.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    habittypes:null,
    checkedType:0,
    habitTypeName:'',
    sexs:[
      {
        code: 0,
        name: '都适用'
      },
      {
        code:1,
        name:'男孩'
      },
      {
        code:2,
        name:'女孩',
      }
    ],
    sexCheckedIndex:0,
    sexName:''
  },
  navToAddHabitType:function(){
      wx.navigateTo({
        url: '/pages/habits/addhabittype/addhabittype',
      })
  },
  handleSelectChange: function (e) {
    this.setData({
      checkedType: e.detail.value,
      habitTypeName: this.data.habittypes[e.detail.value].name
    })
  },
  handleSexSelectChange: function (e) {
    this.setData({
      sexCheckedIndex: e.detail.value,
      sexName: this.data.sexs[e.detail.value].name
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
    habit.getAllType(function(res){
      console.log(res);
      that.setData({
        habittypes: res.data
      });
      that.setData({
        habitTypeName: that.data.habittypes[that.data.checkedType].name
      })
    },function(res){
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
  
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    console.log(formData);
    formData.status = formData.status == true ? 1 : 0;
    console.log(formData)
    formData.habitTypeId = that.data.habittypes[that.data.checkedType].id;
    formData.sexScope = that.data.sexs[that.data.sexCheckedIndex].code
    habit.habitAdd(formData, function (e) {
      console.log(e)
      wx.navigateBack();
    });
  },
})