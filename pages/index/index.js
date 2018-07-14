//index.js
//获取应用实例
const app = getApp()
var account = require('../../request/accounts.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    childs: [],
  },
  // 点击进入孩子页面
  navToChild: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/childs/index?id=' + id,
    })
  },
  navToHabit: function(e) {
    var childId = e.currentTarget.dataset.childid;
    var habitId = e.currentTarget.dataset.habitid;
    wx.navigateTo({
      url: '/pages/habits/habit/index?habitId=' + habitId + '&childId=' + childId,
    })
  },
  //显示习惯的问题
  showQuestions: function(e) {
    var childId = e.currentTarget.dataset.childid;
    var habitId = e.currentTarget.dataset.habitid;
    wx.navigateTo({
      url: '/pages/habits/showquestions/index?habitId=' + habitId + '&childId=' + childId,
    })
  },
  // 存储到数据库
  saveTo: function (userInfo) {
    app.globalData.userInfo = userInfo
    wx.setStorageSync("UserInfo",userInfo)
    this.setData({
      userInfo: userInfo,
      hasUserInfo: true
    });
    var userInfo = userInfo;
    userInfo.openId = app.globalData.openId;
    userInfo.unionId = app.globalData.unionId;
    account.userAdd(userInfo, function(res) {
      wx.setStorageSync("UserId", res.data.id);
      app.globalData.userId = res.data.id;
    }, function() {
      console.debug("add user fail");
    });

  },
  onLoad: function() {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
          this.saveTo(res.userInfo)
        },
        fail: res => {
          wx.showModal({
            title: '提示',
            content: '为了更好的使用小程序，还希望您同意授权',
            showCancel: false,
            confirmText: '授权',
            success: function(res) {
              console.log(res)
              wx.openSetting({
                success: function(data) {
                  if (data) {
                    if (data.authSetting['scope.userInfo'] == true) {
                      wx.getUserInfo({
                        success: res => {
                          console.log(res)
                          that.saveTo(res.userInfo)
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
  onShow: function() {
    if (app.globalData.userId) {
      var that = this;
      var userId = app.globalData.userId;
      account.childGet(userId, function(res) {
        that.setData({
          childs: res.data
        })
      }, function(e) {

      }, function(res) {});
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo
    wx.setStorageSync("UserInfo", e.detail.userInfo)
    this.loginByWx()
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //通过微信接口登录
  loginByWx: function (res) {
    wx.request({
      url: 'https://www.sankexing.net.cn/xingtan/api/login/loginByWx',
      method: 'GET',
      data: { 'code': res.code },
      success: function (res) {
        console.info(res);
        if (res.statusCode == 200 && res.data.status == 'OK') {
          if (res.data.data.openid) {
            wx.setStorageSync("LoginSessionKey", res.data.data.openid + "--" + res.data.data.sessionKey);
            app.globalData.openId = res.data.data.openid;
            app.globalData.unionId = res.data.data.unionid;
            app.globalData.userId = res.data.data.userId;
            wx.setStorageSync("UserId", res.data.data.userId);
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                app.globalData.userInfo = res.userInfo
                wx.setStorageSync("UserInfo", res.userInfo)
                if (app.globalData.userId) {
                  wx.setStorageSync("UserId", userId);
                } else {
                  var userInfo = res.userInfo;
                  userInfo.openId = app.globalData.openId;
                  userInfo.unionId = app.globalData.unionId;
                  //存储到DB
                  wx.request({
                    url: 'https://www.sankexing.net.cn/xingtan/api/user/addByWx',
                    method: 'POST',
                    data: userInfo,
                    success: function (res) {
                      wx.setStorageSync("UserId", res.data.data.id);
                      wx.setStorageSync("token", res.data.data.token);
                    }
                  })
                }
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
            //获取用户
            // wx.getSetting({
            //   success: res => {
            //     console.log("auth:" + res.authSetting['scope.userInfo'])
            //     if (res.authSetting['scope.userInfo']) {
            //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框

            //     }
            //   }
            // })
          }
        } else
          console.log('请求异常', res);
      },
      error: function (res) {
        console.log("app.error:" + res);
      }
    })
  },
})