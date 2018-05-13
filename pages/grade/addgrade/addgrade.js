// pages/grade/addgrade/addgrade.js
var grade = require('../../../request/grade.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolId: 0,
    schoolName: '',
    checkedLevel: 2,
    level: [{
      code: 'EARLY',
      name: '早教班'
    }, {
      code: 'HALFDAY',
      name: '半日班'
    }, {
      code: 'BOTTOM',
      name: '小班'
    }, {
      code: 'MIDDLE',
      name: '中班'
    }, {
      code: 'TOP',
      name: '大班'
    }, {
      code: 'PRESCHOOL',
      name: '学前班'
    }],
    isNeedValidate: false
  },
  handleFieldChange: function (e) {
    this.setData({
      isNeedValidate: e.detail.value
    })
  },
  handleLevelChange: function (e) {
    this.setData({
      checkedLevel: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var schoolId = options.schoolId;
    var schoolName = options.schoolName;
    this.setData({
      schoolId: 1,
      schoolName: '九一幼儿园'
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

  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    formData.schoolId = that.data.schoolId;
    formData.code = that.data.level[that.data.checkedLevel].code;
    formData.isNeedValidate = that.data.isNeedValidate == true ? 1 : 0;
    formData.createdUserId = app.globalData.userId;
    console.log(formData);
    grade.addGrade(formData, function (e) {
      wx.navigateBack();
    }, function () {
      console.log("add grade fail");
    });
  },
  formReset: function (event) {
    console.log('[zan:field:reset]', event);
  },
})