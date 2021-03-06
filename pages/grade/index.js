// pages/grade/index.js
var requests = require('../../request/accounts.js')
var utils = require('../../utils/util.js')
var grade = require('../../request/grade.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [
      { url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg' },
      { url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg' },
      { url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg' },
      { url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg' }
    ],
    gradeId: 1,
    grade: {},
    funcs: [{
      icon: '/images/common/photo.png',
      name: '相册',
      page: '/pages/grade/photos/photo'
    }, {
      icon: '/images/grade/homework.png',
      name: '作业',
      page: '/pages/grade/homework/homework'
    }, {
      icon: '/images/common/notice.png',
      name: '通知',
      page: '/pages/grade/notice/notice'
    }, {
      icon: '/images/common/more.png',
      name: '更多',
      page: '/pages/grade/apps/app'
    }]
    // grade: {
    //   name: 'E81班',
    //   organ: '学而思xxx',
    //   course: '数学夏季版',
    //   openDate: '2018-1-1',
    //   closeDate: '2018-4-3',
    //   gradeStatus: '进行中',
    //   classRoom: 'XX大厦三层301房间',
    //   canDelay: 'NO',// 是否允许延期
    //   canTranfer: "NO",// 是否可以转让 
    //   finishedNum: '10', //已上
    //   allNum: '20',//一共
    //   leftNum: '10',// 剩下
    // }
  },
  navToFunc: function (e) {
    var curpage = e.currentTarget.dataset.page;
    var url = curpage + "?gradeId=" + this.data.gradeId;
    console.log(url)
    wx.navigateTo({
      url: url,
    })
  },
  navToConfig: function(e) {
    wx.navigateTo({
      url: '/pages/grade/config/config',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var gradeId = options.gradeId;
    // that.setData({
    //   gradeId: gradeId
    // });

    // grade.getGrade(that.data.gradeId, function (res) {
    //   that.setData({
    //     grade: res.grade
    //   });
    // }, function () {

    // });

    wx.setNavigationBarTitle({
      title: '班级主页',
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