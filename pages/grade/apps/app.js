// pages/grade/apps/app.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
      icon: '/images/common/file.png',
      name: '文件',
      page: '/pages/grade/files/files'
    }, {
      icon: '/images/grade/teachers.png',
      name: '教师',
      page: '/pages/grade/teacher/teacher'
    }, {
      icon: '/images/grade/students.png',
      name: '学生',
      page: '/pages/grade/student/student'
    }, {
      icon: '/images/common/vote.png',
      name: '投票',
      page: '/pages/grade/vote/vote'
    },{
      icon: '/images/common/activity.png',
      name: '活动',
      page: '/pages/grade/activity/activity'
    }, {
      icon: '/images/common/stat.png',
      name: '统计',
      page: '/pages/grade/stat/stat'
    }]
  },
  navToFunc: function (e) {
    console.log(e)
    var curpage = e.currentTarget.dataset.page;
    wx.navigateTo({
      url: curpage,
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