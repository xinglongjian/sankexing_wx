// pages/habits/index.js
var habit = require('../../request/habit.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems: [],
    navRightItems: [],
    curNav: 1,
    curIndex: 0
  },
  navToAddHabit:function() {
    wx.navigateTo({
      url: '/pages/habits/addhabit/addhabit',
    })
  },
  //事件处理函数  
  switchRightTab: function (e) {
    // 获取item项的id，和数组的下标值  
    console.log(e)
    let id = e.target.dataset.id,
    index = parseInt(e.target.dataset.index);
    // 把点击到的某一项，设为当前index  
    this.setData({
      curNav: id,
      curIndex: index
    })
    var that = this;
    habit.getHabitByType(id, function (res) {
      console.log(res)
      that.setData({
        navRightItems: res.data
      })
    });
  },  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 加载的使用进行网络访问，把需要的数据设置到data数据对象  
    var that = this
    habit.getAllType(function (res) {
      console.log(res)
      that.setData({
        navLeftItems: res.data
      });
      var typeId = 0;
      if (that.data.navLeftItems) {
        typeId = that.data.navLeftItems[0].id;
      }
      habit.getHabitByType(typeId, function (res) {
        that.setData({
          navRightItems: res.data
        })
      });
    });
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