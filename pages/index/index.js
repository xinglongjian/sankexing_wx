//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    gradeValue: 'XI10',
    myClasses:[{
      id:'31',
      courseName:'中国象棋',
      organName: '中国儿童中心',
      classesName:'31班',
      classesTime:'9-23(四) 17:00~19:00',
      teacher:'张三',
      finished:'3',
      left:'10',
      classroom:'第四教师啊沙发上地方'
    },{
      id: '32',
      courseName: '国际象棋',
      organName: '中国儿童中心',
      classesName: '31班',
      classesTime: '9-25(六) 17:00~19:00',
      teacher: '张三',
      finished: '3',
      left: '10',
      classroom: '第四教师啊沙发上地方'
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
