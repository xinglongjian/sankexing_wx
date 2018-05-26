// pages/grade/photos/upload/upload.js
var album = require('../../../../request/album.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos: [
    ],
    isHiddenDelete: true,
    isHiddenSelect: false,
    gradeId: 0,
    albumUrl: '',
    albumName: '班级相册',
    position: '',
    info: '',
    formData: {}
  },
  //显示删除按钮
  showDelete: function (e) {
    this.setData({
      isHiddenDelete: !this.data.isHiddenDelete
    })
  },
  //删除图片
  deleteImage: function (e) {
    var i = e.currentTarget.dataset.index;
    this.data.photos.splice(i, 1)
    this.setData({
      photos: this.data.photos
    })
  },
  selectImage: function (e) {
    var that = this;
    var left = 9 - this.data.photos.length
    wx.chooseImage({
      count: left,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        const images = res.tempFilePaths
        that.setData({
          photos: that.data.photos.concat(images)
        })
        //如果到达9个就不再添加
        if (that.data.photos.length == 9) {
          that.setData({
            isHiddenSelect: true
          })
        }
      }
    })
  },
  uploadImage: function (e) {
    console.log(e)
    var that = this;
    var formData = {};
    formData.name = that.data.albumName;
    formData.position = that.data.position;
    formData.info = that.data.info;
    formData.gradeId = that.data.gradeId;
    formData.userId = app.globalData.userId;
    that.setData({
      formData: formData
    })
    that.uploadSingleImage({})
    console.log(formData)
  },

  uploadSingleImage: function (data) {
    var that = this;
    console.log(data);
    console.log(that.data.formData);

    var i = data.i ? data.i : 0,//当前上传的哪张图片
    success = data.success ? data.success : 0,//上传成功的个数
    fail = data.fail ? data.fail : 0;//上传失败的个数
    var imagePath = that.data.photos[i];
    console.log(imagePath);
    album.uploadAlbum(imagePath, 'imgFile', that.data.formData,
      function (res) {
        success++;
      },
      function (res) {
        fail++;
      },
      function (e) {
        i++;
        if (i == that.data.photos.length) {
          console.log("完成")
          wx.navigateBack();
        } else {
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadSingleImage(data);
        }
      });
  },






  bindPosition: function (e) {
    this.setData({
      position: e.detail.value
    })
  },
  bindInfo: function (e) {
    this.setData({
      info: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var srcs = options.srcs;
    var gradeId = options.gradeId;

    console.log(srcs);
    this.setData({
      gradeId: gradeId,
      albumUrl: '/pages/grade/photos/album/album?gradeId=' + gradeId,
      photos: srcs.split(',')
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