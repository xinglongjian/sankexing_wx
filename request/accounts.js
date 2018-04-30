var api = require('./base.js');
// var utils = require('../utils/util.js')

var USER_API = api.API_BASE + "/api/user"
var USER_ADD_URL = USER_API + "/addByWx" //添加用户
var CHILD_ADD_URL = USER_API + "/addByParent" //添加孩子
var CHILD_GET_URL = USER_API + "/getByParent/" //获取孩子

/**
 * 添加用户
 */
function userAdd(data, successCb, errorCb, completeCb) {
  api.request(USER_ADD_URL, 'POST', data, successCb, errorCb, completeCb);
}

function childAdd(tempFilePaths, name, formdata,successCb, errorCb, completeCb) {
  api.uploadFile(CHILD_ADD_URL, tempFilePaths, name, formdata, successCb, errorCb, completeCb);
}
/**
 * 获取孩子
 */
function childGet(userId, successCb, errorCb, completeCb) {
  api.request(CHILD_GET_URL+userId, 'GET', null, successCb, errorCb, completeCb);
}

module.exports = {
  userAdd: userAdd,
  childAdd: childAdd,
  childGet: childGet
}