// pages/profile/childs/addchild.js
var util = require('../../../../utils/util.js')
var account = require('../../../../request/accounts.js')
var app = getApp();
Page({
  data: {
    // text:"这是一个页面"  
    toast1Hidden: true,
    modalHidden: true,
    modalHidden2: true,
    notice_str: '',
    date:null,
    time:null,
    headImageSrc:'/images/default_head.jpg',
    relationArray: [
      {
        code: 'BABA',
        name: '爸爸'
      },
      {
        code: 'MAMA',
        name: '妈妈'
      },
      {
        code: 'YEYE',
        name: '爷爷'
      },
      {
        code: 'NAINAI',
        name: '奶奶'
      },
      {
        code: 'LAOLAO',
        name: '姥姥'
      },
      {
        code: 'LAOYE',
        name: '姥爷'
      },
      {
        code: 'OTHER',
        name: '其他'
      }
    ],
    index: 0,
    relationName: ''
  },
  /**
   * 监听日期picker选择器
   */
  listenerDatePickerSelected: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  listenerTimePickerSelected: function (e) {
    this.setData({
      time: e.detail.value
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
    this.setData({
      index: e.detail.value,
      relationName: this.data.relationArray[e.detail.value].name
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
    this.setData({
      relationName: this.data.relationArray[this.data.index].name
    })
  },
  onReady: function () {
    // 页面渲染完成  
  },
  onShow: function () {
    // 页面显示  
    this.setData({
      date:util.formatDate(new Date()),
      time: util.formatHM(new Date())
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
    formData.createdUserId = app.globalData.userId;
    console.log(formData)
    account.childAdd(that.data.headImageSrc, 'imgFile', formData, function(e){
      wx.showToast({
        title: '添加成功',
      })
      wx.navigateBack();
    },function(){
      wx.showToast({
        title: '添加失败',
      })
    });
  },
  formReset: function () {
    console.log('form发生了reset事件');
    this.modalTap2();
  }
})  