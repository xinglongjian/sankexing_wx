// pages/admin/addhabitquestion/index.js
var habit = require('../../../request/habit.js')
var util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionId: 0,
    questionTypes: [
      {
        code: 'SELECT',
        name: '选择题'
      }, {
        code: 'JUDGE',
        name: '判断题'
      }, {
        code: 'FILLBLANK',
        name: '填空题'
      }
    ],
    questionTypeChecked: 0,
    stepper: {
      // 当前 stepper 数字
      stepper: 1,
      // 最小可到的数字
      min: 0,
      // 最大可到的数字
      max: 10,
      // 小尺寸, 默认大尺寸
      size: 'small',
      step: 0.1
    },
    title: '',
    introduce: '',
    good: '',
    bad: ''
  },
  handleZanStepperChange: function (e) {
    var v = e.detail;
    v = v.toFixed(1)
    this.setData({
      'stepper.stepper': v
    })
  },
  handleSelectChange: function (e) {
    this.setData({
      questionTypeChecked: e.detail.value
    })
  },

  bindTitle: function (e) {
    var title = e.detail.value
    this.setData({
      title: title
    })
  },
  bindIntroduce: function (e) {
    var intro = e.detail.value
    this.setData({
      introduce: intro
    })
  },
  bindGood: function (e) {
    var good = e.detail.value
    this.setData({
      good: good
    })
  },
  bindBad: function (e) {
    var bad = e.detail.value
    this.setData({
      bad: bad
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var questionId = options.questionId
    this.setData({
      questionId: questionId == undefined ? 0 : questionId
    })
    if (this.data.questionId != 0) {
      var that = this;
      habit.getHabitQuestion(this.data.questionId, function(res){
        console.log(res)
        var questionTypeChecked = util.indexOf(that.data.questionTypes,"code",res.data.type);
        that.setData({
          questionTypeChecked: questionTypeChecked,
          'stepper.stepper': res.data.weight,
          title:res.data.title,
          introduce: res.data.introduce,
          good: res.data.good,
          bad: res.data.bad
        })
      },function(res){

      })
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
    var data = {}
    data.type = this.data.questionTypes[this.data.questionTypeChecked].code
    data.title = this.data.title
    data.weight = this.data.stepper.stepper
    data.introduce = this.data.introduce
    data.good = this.data.good
    data.bad = this.data.bad
    data.id = this.data.questionId

    habit.addHabitQuestion(data, function (res) {
      wx.showToast({
        title: '添加成功',
      })
      wx.navigateBack()
    }, function () {
      wx.showToast({
        title: '添加失败',
      })
    })
    console.log(data)
  }
})