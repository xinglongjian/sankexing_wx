// pages/admin/addschool/addschool.js
const config = require('./config');
const address = require('../../../request/address.js')
const school = require('../../../request/school.js')
var app = getApp();
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
    provinces: [],
    province: "",
    provinceIndex: 0,
    citys: [],
    city: "",
    cityIndex: 0,
    areas: [],
    area: '',
    areaIndex: 0,
    animationData: {},
    win_height: 600,
    win_width: 0,
    val:[0,0,0]
  },

  handleSelectChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      checkedType: e.detail.value
    })
  },
  open: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
    this.animation = animation
    animation.height(this.data.win_height).step()
    this.setData({
      animationData: animation.export()
    })
  },
  quxiao: function () {
    //这里也是动画，然其高度变为0
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.height(0 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    });
  },
  cancel: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.height(0 + 'rpx').step()

    this.setData({
      animationData: animation.export()
    });
  },
  confirm: function () {
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })

    this.animation = animation
    animation.height(0 + 'rpx').step()
    this.setData({
      animationData: animation.export()
    });
  },
  citychange: function (e) {
    var val = e.detail.value
    var that = this;
    if (that.data.provinceIndex != val[0]) {
      that.setData({
        province : that.data.provinces[val[0]].name
      });
      that.getCityArr(that, val)
    }
    else if (that.data.cityIndex != val[1]) {
      that.setData({
        city: that.data.citys[val[1]].name
      });
      that.getAreaArr(that, val)
    }
    else if(that.data.areaIndex != val[2]) {
      that.setData({
        area: that.data.areas[val[2]].name,
        areaIndex: val[2]
      });
    }
  },
  getProvinceArr: function (that,val) {
    address.getLevelOneAreas(function (res) {
      that.setData({
        provinces: res.data,
        province: res.data[0].name
      })
      that.getCityArr(that,val);
    });
  },
  getCityArr: function (that, val) {
    var province = that.data.provinces[val[0]];
    address.getAreaByParentNo(province.no, 2, function (res) {
      that.setData({
        citys: res.data,
        city: res.data[val[1]].name
      })
      that.getAreaArr(that, val);
    }, function () {

    });
  },
  getAreaArr: function (that, val) {
    var city = that.data.citys[val[1]];
    address.getAreaByParentNo(city.no, 3, function (res) {
      that.setData({
        areas: res.data,
        area: res.data[val[2]].name
      })
    });

    that.setData({
      provinceIndex: val[0],
      cityIndex: val[1],
      areaIndex: val[2]
    })
  },

  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    formData.type = that.data.checkedType;
    formData.province = that.data.province;
    formData.city = that.data.city;
    formData.district = that.data.area;
    console.log(formData)
    school.addSchool(formData, function (e) {
      wx.navigateBack();
    },function(){
      console.log("add school fail");
    });
  },
  formReset: function(event) {
    console.log('[zan:field:reset]', event);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.getProvinceArr(that,that.data.val)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {

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

  }


})