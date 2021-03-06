var api = require('./base.js');

var LOGIN_API = api.API_BASE + "/api/login"
var LOGIN_BY_WX_URL = LOGIN_API + "/loginByWx" //登录

/**
 * 添加用户
 */
function login(data, successCb, errorCb, completeCb) {
  api.request(LOGIN_BY_WX_URL, 'GET', data, successCb, errorCb, completeCb);
}

function logins() {
  // 登录
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log(res);
      if (res.code) {
        // 从小程序本地获取token
        var token = wx.getStorageSync("token");
        if (token) {
          loginByToken(token);
        } else {
          loginByWx( res);
        }
      }
    }
  })
}

//通过微信接口登录
function loginByWx(res) {
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
}

function loginByToken(token) {
  wx.request({
    url: 'https://www.sankexing.net.cn/xingtan/api/login/loginByToken',
    method: 'GET',
    data: { 'token': token },
    success: function (res) {
      console.info(res);
      if (res.statusCode == 200 && res.data.status == 'OK') {
        if (res.data.data) {
          wx.setStorageSync("LoginSessionKey", res.data.data.openid + "--" + res.data.data.sessionKey);
          app.globalData.openId = res.data.data.openid;
          app.globalData.unionId = res.data.data.unionid;
          app.globalData.userId = res.data.data.userId;
          wx.setStorageSync("UserId", res.data.data.userId);
          //wx.setStorageSync("token", res.data.data.token);
        }
      } else
        console.log('请求异常', res);
    },
    error: function (res) {
      console.log("app.error:" + res);
    }
  })
}

module.exports = {
  login: login
}