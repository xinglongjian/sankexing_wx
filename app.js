//app.js
var login = require('./request/login.js')
App({
  onLaunch: function() {
    // 展示本地存储能力
    if (wx.getStorageSync('LoginSessionKey')) {
      this.globalData.openId = wx.getStorageSync('LoginSessionKey').toString().split('--')[0]
      this.globalData.userId = wx.getStorageSync('UserId');
      this.globalData.userInfo = wx.getStorageSync('UserInfo');
      return;
    }

    var that = this;
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        if (res.code) {
          that.globalData.code = res.code;
          // 从小程序本地获取token
          var token = wx.getStorageSync("token");
          if (token) {
            that.loginByToken(token, that);
          } else {
            //该接口不再提供
            //that.loginByWx(res,that);
          }
        }
      }
    })
  },
  //通过微信接口登录
  loginByWx: function(res, that) {
    wx.request({
      url: 'https://www.sankexing.net.cn/xingtan/api/login/loginByWx',
      method: 'GET',
      data: {
        'code': res.code
      },
      success: function(res) {
        console.info(res);
        if (res.statusCode == 200 && res.data.status == 'OK') {
          if (res.data.data.openid) {
            wx.setStorageSync("LoginSessionKey", res.data.data.openid + "--" + res.data.data.sessionKey);
            console.log('------')
            that.globalData.openId = res.data.data.openid;
            that.globalData.unionId = res.data.data.unionid;
            that.globalData.userId = res.data.data.userId;
            wx.setStorageSync("UserId", res.data.data.userId);
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                that.globalData.userInfo = res.userInfo
                wx.setStorageSync("UserInfo", res.userInfo)
                if (that.globalData.userId) {
                  wx.setStorageSync("UserId", userId);
                } else {
                  var userInfo = res.userInfo;
                  userInfo.openId = that.globalData.openId;
                  userInfo.unionId = that.globalData.unionId;
                  //存储到DB
                  wx.request({
                    url: 'https://www.sankexing.net.cn/xingtan/api/user/addByWx',
                    method: 'POST',
                    data: userInfo,
                    success: function(res) {
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
      error: function(res) {
        console.log("app.error:" + res);
      }
    })
  },

  //如果有token直接登录
  loginByToken: function(token, that) {
    wx.request({
      url: 'https://www.sankexing.net.cn/xingtan/api/login/loginByToken',
      method: 'GET',
      data: {
        'token': token
      },
      success: function(res) {
        console.info(res);
        if (res.statusCode == 200 && res.data.status == 'OK') {
          if (res.data.data) {
            wx.setStorageSync("LoginSessionKey", res.data.data.openid + "--" + res.data.data.sessionKey);
            that.globalData.openId = res.data.data.openid;
            that.globalData.unionId = res.data.data.unionid;
            that.globalData.userId = res.data.data.userId;
            wx.setStorageSync("UserId", res.data.data.userId);
            //wx.setStorageSync("token", res.data.data.token);
          }
        } else
          console.log('请求异常', res);
      },
      error: function(res) {
        console.log("app.error:" + res);
      }
    })
  },


  globalData: {
    userInfo: null,
    openId: null,
    unionId: null,
    userId: null,
    studentId: null,
    code: null
  }
})