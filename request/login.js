var api = require('./base.js');

var LOGIN_API = api.API_BASE + "/api/login"
var LOGIN_BY_WX_URL = USER_API + "/loginByWx" //登录

/**
 * 添加用户
 */
function login(data, successCb, errorCb, completeCb) {
  api.request(LOGIN_BY_WX_URL, 'GET', data, successCb, errorCb, completeCb);
}

module.exports = {
  login: login
}