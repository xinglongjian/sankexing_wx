// pages/grade/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gradeId:0,
    navbar: ['最新上传', '全部相册', '我的照片'],
    currentTab: 0,
    currentImage: '/images/common/upload.png',
    images: ['/images/common/upload.png', '/images/common/new.png', '']
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx,
      currentImage: this.data.images[e.currentTarget.dataset.idx]
    })
  },
  //上传照片
  uploadImage: function () {
    var that = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        const srcs = res.tempFilePaths
        console.log('src:' + srcs)
        wx.redirectTo({
          url: './upload/upload?gradeId='+that.data.gradeId+'&srcs=' + srcs.join(","),
        })
      }
    })
  },
  //新建相册
  newAlbum: function () {

  }, 
  imageFun: function (e) {
    if (this.data.currentTab == 0) {
      this.uploadImage();
    } else {
      newAlbum();
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gradeId= options.gradeId;
    console.log('photo,'+gradeId)
    this.setData({
      gradeId: gradeId
    })
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