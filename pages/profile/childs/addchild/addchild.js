// pages/profile/childs/addchild.js
var util = require('../../../../utils/util.js')
var app = getApp();
Page({
  data: {
    // text:"这是一个页面"  
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    index: 0,
    date:null,
    headImageSrc:'/images/default_head.jpg'
  },
  /**
   * 监听日期picker选择器
   */
  listenerDatePickerSelected: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  toast1Change: function (e) {
    this.setData({ toast1Hidden: true });
  },
  //弹出确认框  
  modalTap: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  confirm_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '提交成功'
    });
  },
  cancel_one: function (e) {
    console.log(e);
    this.setData({
      modalHidden: true,
      toast1Hidden: false,
      notice_str: '取消成功'
    });
  },
  //弹出提示框  
  modalTap2: function (e) {
    this.setData({
      modalHidden2: false
    })
  },
  modalChange2: function (e) {
    this.setData({
      modalHidden2: true
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let { avatar } = options
    if (avatar) {
      this.setData({
        headImageSrc: avatar
      })
    }  
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
    this.setData({
      date:util.formatDate(new Date())
    })
  },
  onHide: function () {
    // 页面隐藏  
  },
  onUnload: function () {
    // 页面关闭  
  },
  //更换头像
  changeImage:function(e) {
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original','compressed'],
      sourceType:['album','camera'],
      success: function(res) {
        const src = res.tempFilePaths[0]
        console.log('src:'+src)
        wx.redirectTo({
          url: '../upload/upload?src='+src,
        })
      }
    })
  },
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: 'http://test.com:8080/test/socket.php?msg=2',
      data: formData,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.modalTap();
      }
    })
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  }
})  