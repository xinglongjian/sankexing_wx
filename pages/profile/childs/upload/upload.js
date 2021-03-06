import WeCropper from '../../../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.screenWidth
const height = device.screenHeight - 50

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  touchStart:function(e) {
    this.wecropper.touchStart(e)
  },
  touchMove:function(e) {
    this.wecropper.touchMove(e)
  },
  touchEnd:function(e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage:function() {
    this.wecropper.getCropperImage((avatar) => {
      if (avatar) {
        //  获取到裁剪后的图片
        wx.redirectTo({
          url: `../addchild/addchild?avatar=${avatar}`
        })
      } else {
        console.log('获取图片失败，请稍后重试')
      }
    })
  },
  uploadTap:function() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad: function (options) {
    console.log("dev:"+device.screenHeight)
    const { cropperOpt } = this.data
    console.log(cropperOpt)
    if (options.src) {
      cropperOpt.src = options.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`before canvas draw,i can do something`)
          console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    }
  }
})