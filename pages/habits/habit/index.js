// pages/habits/habit/index.js
var habitapi = require('../../../request/habit.js')
var account = require('../../../request/accounts.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form:{
      assistance:''
    },
    habitId: 0,
    habit: {},
    childs: [],
    //是否已加入
    isPartIn:false,
    partInChild:{},
    hiddenmodalput: true
  },
  // 给哪个孩子添加
  addHabit: function (e) {
    var that = this;
    console.log('add' + this.data.childs.length)
    if (this.data.childs.length == 0 || this.data.childs == undefined) {
      var userId = app.globalData.userId;
      account.childGet(userId, function (res) {
        console.log(res)
        var childArray = [];
        for (var i = 0; i < res.data.length; i++) {
          var child = {};
          child.id = res.data[i].id;
          child.name = res.data[i].realName;
          child.checked = true;
          childArray[i] = child;
        }
        that.setData({
          childs: childArray
        });
        console.log(that.data.childs)
        //弹出选择框
        that.setData({
          hiddenmodalput: !that.data.hiddenmodalput
        })
      }, function () {
        
      });
    } else {
      //弹出选择框
      that.setData({
        hiddenmodalput: !that.data.hiddenmodalput
      })
    }
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    var userIds=[]
    for(var i = 0;i<this.data.childs.length;i++) {
      if(this.data.childs[i].checked) {
        userIds.push(this.data.childs[i].id);
      }
    }
    var userIdParam={}
    userIdParam.userIds = userIds.join(",");
    userIdParam = JSON.stringify(userIdParam);
    console.log(userIdParam)
    wx.showLoading()
    habitapi.addHabitToManyUser(this.data.habit.id, app.globalData.userId, userIdParam,        function (res) {
      wx.hideLoading()
      wx.showToast({
        title: '添加成功',
      })
    });
    this.setData({
      hiddenmodalput: true
    })
  },
  checkboxChange:function(e) {
    const values = e.detail.value
    const childs = this.data.childs
    console.log(childs)
    for (let i = 0, lenI = childs.length; i < lenI; ++i) {
      childs[i].checked = !1
      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (childs[i].id == values[j]) {
          childs[i].checked = !0
          break
        }
      }
    }

    this.setData({
      childs: childs,
      'form.assistance': values, 
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var habitId = options.habitId;
    var childId = options.childId;
    var childName = options.childName;
    console.log("A:" + childId)
    if (childId != undefined && childName != undefined) {
      console.log("B:" + childId)
      var child = {}
      child.id = childId;
      child.name = childName;
      child.checked = true;
      this.setData({
        childs: [child]
      });
    }
    
   

    this.setData({
      habitId: habitId
    })
    var that = this;

    if (childId != undefined) {
      //判断孩子是否已添加
      habitapi.isHabitContainUser(that.data.habitId, childId,function(res){
          if(res.data) {
            that.setData({
              isPartIn:true,
              partInChild:res.data
            })
          }
      })
    }
    

    habitapi.getHabitById(this.data.habitId, function (res) {
      that.setData({
        habit: res.data
      })
      wx.setNavigationBarTitle({
        title: res.data.name,
      })
    }, function () {

    });

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

  }
})