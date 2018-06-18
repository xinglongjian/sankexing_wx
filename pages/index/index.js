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
  // 存储到数据库
  saveTo: function(res) {
    app.globalData.userInfo = res.userInfo
    wx.setStorageSync("UserInfo", res.userInfo)
    this.setData({
      userInfo: res.userInfo,
      hasUserInfo: true
    });
    var userInfo = res.userInfo;
    userInfo.openId = app.globalData.openId;
    userInfo.unionId = app.globalData.unionId;
    account.userAdd(userInfo, function(res) {
      console.log(res)
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
          this.saveTo(res)
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
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})