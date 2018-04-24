//index.js
//获取应用实例
const app = getApp()
var requests = require('../../request/accounts.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
  // 存储到数据库
  saveTo: function(res) {
    app.globalData.userInfo = res.userInfo
    this.setData({
      userInfo: res.userInfo,
      hasUserInfo: true
    });
    var userInfo = res.userInfo;
    userInfo.openId = app.globalData.openId;
    userInfo.unionId = app.globalData.unionId;
    requests.userAdd(userInfo, function (res) {
      console.log(res)
      wx.setStorageSync("UserId", res.data.id);
    }, function () {
      console.debug("add user fail");
    });

  },
  onLoad: function () {
    var that = this;
    console.debug('index onLoad');
    if (app.globalData.userInfo) {
      console.debug('app.globalData.userInfo')
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.debug('canIuSER');
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      console.debug('getuserinfo in index')
      var that = this;
      wx.getUserInfo({
        success: res => {
          this.saveTo(res)
        },
        fail:res =>{
          wx.showModal({
            title: '提示',
            content: '为了更好的使用小程序，还希望您同意授权',
            showCancel:false,
            confirmText:'授权',
            success:function(res){
              console.log(res)
              wx.openSetting({
                success:function(data){
                    if(data) {
                      if(data.authSetting['scope.userInfo']==true) {
                        wx.getUserInfo({
                          success: res => {
                            console.log(res)
                            that.saveTo(res)
                          }
                        })
                      }
                    }
                }
              })  
                
              
            }
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log("dd:");
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
