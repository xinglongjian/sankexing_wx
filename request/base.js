const API_BASE = "https://www.sankexing.net.cn/xingtan";
var utils = require('../utils/util.js')
/**
 * 网路请求
 */
function request(url, method, data, successCb, errorCb, completeCb) {
  console.debug(url)
  wx.request({
    url: url,
    method: method,
    data: data,
    // header: {
    //   'content-type': method == 'GET' ?'application/json':'application/x-www-form-urlencoded'
    // },
    success: function (res) {
      
      if (res.statusCode == 200) {
        // console.log(res)
        utils.isFunction(successCb) && successCb(res.data);
      } else
        console.log('请求异常', res);
    },
    error: function () {
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      utils.isFunction(completeCb) && completeCb();
    }
  });
}
//上传文件
function uploadFile(url, tempFilePaths, name, formdata, successCb, errorCb, completeCb) {
  console.log('url='+url)
  wx.uploadFile({
    url: url,
    filePath: tempFilePaths,
    name: name,
    header:{
      'content-type': 'application/x-www-form-urlencoded'
    },
    formData:formdata, //http请求的其他额外data
    success: function (res) {
      if (res.statusCode == 200) {
        utils.isFunction(successCb) && successCb(res.data);
      } else
        console.log('请求异常', res);
    },
    error: function () {
      utils.isFunction(errorCb) && errorCb();
    },
    complete: function () {
      utils.isFunction(completeCb) && completeCb();
    }
  })
}


module.exports = {
    request: request,
    uploadFile: uploadFile,
    API_BASE : API_BASE
}