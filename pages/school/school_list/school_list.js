// pages/school/school_list/school_list.js
const student = require('../../../request/student.js')
const teacher = require('../../../request/teacher.js')
const school = require('../../../request/school.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schools: [],
    userType: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      userType: options.userType
    });

    if (options.searchValue) {
      var data = {}
      data.name = options.searchValue;
      school.querySchool(data, function (res) {
        console.log(res.data)
        that.setData({
          schools: res.data
        });
      }, function () {

      })
    }
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
  // 
  addToSchool: function (options) {
    var schoolId = options.target.dataset.id
    var data = {}
    data.schoolId = schoolId;

    if (this.data.userType == 'teacher') {
      data.teacherId = app.globalData.userId;
      teacher.addToSchool(data,function(res){
          console.log("Success"+res);
          wx.navigateBack()
      },function(){

      });
    } else if (this.data.userType == 'student') {

      student.addToSchool()
    }
  }
})