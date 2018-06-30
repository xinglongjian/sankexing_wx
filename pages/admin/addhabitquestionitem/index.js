// pages/admin/addhabitquestionitem/index.js
var habitapi = require('../../../request/habit.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionId: 0,
    itemId:0,
    seqs: [1, 2, 3, 4, 5],
    seqChecked:0,
    seqNos: ["A", "B", "C", "D", "E"],
    seqNoChecked:0,
    stepper: {
      // 当前 stepper 数字
      stepper: 0,
      // 最小可到的数字
      min: -2,
      // 最大可到的数字
      max: 2,
      // 小尺寸, 默认大尺寸
      size: 'small',
      step: 1
    },
    content:'',
    affect:''
  },
  handleZanStepperChange: function (e) {
    var v = e.detail;
    v = v.toFixed(0)
    this.setData({
      'stepper.stepper': v
    })
  },
  handleSeqSelectChange:function(e) {
    this.setData({
      seqChecked: e.detail.value
    })
  },
  handleSeqNoSelectChange:function(e) {
    this.setData({
      seqNoChecked: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.questionId;
    var itemId = options.itemId;
    this.setData({
      questionId: id,
      itemId:itemId==undefined?0:itemId
    })
    
    if(itemId != 0 ){
      var that = this
      habitapi.getQuestionItem(itemId,function(res){
        var seqChecked = that.data.seqs.indexOf(res.data.seq);
        var seqNoChecked = that.data.seqNos.indexOf(res.data.seqNo);
        that.setData({
          'stepper.stepper': res.data.score,
          seqChecked: seqChecked,
          seqNoChecked: seqNoChecked,
          content: res.data.content,
          affect: res.data.affect
        })
      },function(res){

      });
    }
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
  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    formData.id = that.data.itemId;
    formData.questionId = that.data.questionId;
    formData.seq = that.data.seqs[that.data.seqChecked];
    formData.seqNo = that.data.seqNos[that.data.seqNoChecked];
    formData.score = that.data.stepper.stepper
    console.log(formData)
    habitapi.addHabitQuestionItem(formData, function (e) {
      wx.showToast({
        title: '添加成功',
      })
      wx.navigateBack();
    },function(e){
      console.log(e)
    });
  }
})