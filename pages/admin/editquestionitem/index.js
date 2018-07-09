// pages/admin/editquestionitem/index.js
var habitapi = require('../../../request/habit.js')
const Dialog = require('../../../third/zanui/dist/dialog/dialog.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionId: 0,
    title: '',
    items: []
  },

  getData: function (that) {
    habitapi.getQuestionItems(that.data.questionId, function (res) {
      console.log(res)
      that.setData({
        title: res.data.title,
        items: res.data.items
      })
    }, function () {
      console.log("ERROR")
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.questionId;
    this.setData({
      questionId:id
    })
    var that = this;
    that.getData(that);
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
    var that = this;
    that.getData(that);
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

  navToAddQuestionItem: function (e) {
    wx.navigateTo({
      url: '/pages/admin/addhabitquestionitem/index?questionId=' + this.data.questionId,
    })
  },
  navToEditQuestionItem: function (e) {
    var itemId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/admin/addhabitquestionitem/index?questionId=' + this.data.questionId + "&itemId=" + itemId,
    })
  },
  deleteQuestionItem: function (e) {
    var that = this;
    var itemId = e.currentTarget.dataset.id;
    Dialog({
      title: '提示',
      message: '确认要删除该记录？',
      selector: '#zan-base-dialog',
      showCancelButton: true
    }).then((res) => {
      if (res.type == 'confirm') {
        that.deleteItem(that, itemId)
      }
    }).catch(()=>{
      console.log("concel")
    });
  },
  deleteItem: function (that, itemId) {
    habitapi.deleteQuestionItem(itemId, function (res) {
      wx.showToast({
        title: '删除成功',
      })
      that.getData(that);
    }, function (res) {

    });
  }
})