//app.js
//var requests = require('./request/login.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    if(wx.getStorageSync('LoginSessionKey')) return;
    var that = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.debug('code:'+res.code);
        if(res.code) {
          console.debug("wx.request");
          wx.request({
            url: 'https://www.sankexing.net.cn/xingtan/api/login/loginByWx',
            method: 'GET',
            data: {'code':res.code},
            success: function (res) {
              console.info(res);
              if (res.statusCode == 200 && res.data.status == 'OK') {
                
                if (res.data.data.openid) {
                  wx.setStorageSync("LoginSessionKey", res.data.data.openid +"--"+ res.data.data.sessionKey);
                  // 获取用户
                  wx.getSetting({
                    success: res => {
                      console.debug("setting");
                      console.debug("auth:" + res.authSetting['scope.userInfo']);
                      var openId = res.data.data.openid;
                      var unionId = res.data.data.unionid;
                      if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                        wx.getUserInfo({
                          success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            if(res.data.data.userId) {
                              wx.setStorageSync("UserId", res.data.data.userId);
                            } else {
                              var userInfo = res.userInfo;
                              userInfo.openId = openId;
                              userInfo.unionId = unionId;
                              //存储到DB
                              wx.request({
                                url: 'https://www.sankexing.net.cn/xingtan/api/user/addByWx',
                                method: 'POST',
                                data: userInfo,
                                success:function(res){
                                  console.log(res);
                                  wx.setStorageSync("UserId", res.data.id);
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
                      }
                    }
                  })
                }
              } else
                console.log('请求异常', res);
            },
            error: function (res) {
              console.log("app.error:"+res);
            }
          })
        }
      }
    })
  },
  

  globalData: {
    userInfo: null
  }
})