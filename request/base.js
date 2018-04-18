const API_BASE = "/xingtan";
/**
 * 网路请求
 */
function request(url, method, data, successCb, errorCb, completeCb) {
  wx.request({
    url: url,
    method: method,
    data: data,
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
  });
}
module.exports = {
    request: request,
    API_BASE : API_BASE
}