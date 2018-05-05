// pages/admin/addschool/addschool.js
const config = require('./config');
const model = require('../../../templates/address/index.js')
var show= false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    config,
    checkedType: 0,
    schoolType: [
      {
        value: '0',
        // 选项文案
        name: '学校'
      },
      {
        value: '1',
        name: '机构'
      },
      {
        value: '2',
        name: '其他'
      }
    ],
    item:{
     show: show,
     province:'ereer',
     city:'erer',
     area:'err'
    }
    
  },

  handleSelectChange: function(e) {
    console.log(e.detail.value)
    this.setData({
      checkedType:e.detail.value
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
  onReady: function (e) {
    var that = this;
    model.updateAreaData(that, 0, e);
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
  
  },
  //点击选择城市按钮显示picker-view
  translate: function (e) {
    model.animationEvents(this, 0, true, 400);
  },
  //隐藏picker-view
  hiddenFloatView: function (e) {
    model.animationEvents(this, 200, false, 400);
  },
  //滑动事件
  bindChange: function (e) {
    model.updateAreaData(this, 1, e);
    item = this.data.item;
    this.setData({
      province: item.provinces[item.value[0]].name,
      city: item.citys[item.value[1]].name,
      area: item.countys[item.value[2]].name
    });
  },
  onReachBottom: function () {
  },
  nono: function () { }
})