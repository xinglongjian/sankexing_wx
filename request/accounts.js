var api = require('./base.js');
// var utils = require('../utils/util.js')

var USER_API = api.API_BASE + "/api/user"
var USER_ADD_URL = USER_API + "/addByWx" //添加用户
var CHILD_ADD_URL = USER_API + "/addByParent" //添加孩子

/**
 * 添加用户
 */
function userAdd(data, successCb, errorCb, completeCb) {
  api.request(USER_ADD_URL, 'POST', data, successCb, errorCb, completeCb);
}

function childAdd(data, tempFilePaths, name, formdata,successCb, errorCb, completeCb) {
  api.uploadFile(CHILD_ADD_URL, tempFilePaths, name, formdata, successCb, errorCb, completeCb);
}

module.exports = {
  userAdd: userAdd
}