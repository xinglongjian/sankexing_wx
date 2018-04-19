var api = require('./base.js');
// var utils = require('../utils/util.js')

var USER_API = api.API_BASE + "/api/user"
var USER_ADD_URL = USER_API + "/addByWeixin" //添加用户

/**
 * 添加用户
 */
function userAdd(data, successCb, errorCb, completeCb) {
  api.request(USER_ADD_URL, 'POST', data, successCb, errorCb, completeCb);
}

module.exports = {
  userAdd: userAdd
}