var api = require('./base.js');
var util = require('../utils/util.js')

var AREA_API = api.API_BASE + "/api/area"
var GET_BYPARENT_API = AREA_API + "/byParentNo/{0}/{1}"
var GET_LEVELONE_API = AREA_API + "/levelOne"

function getAreaByParentNo(parentNo, level,successCb, errorCb, completeCb) {
  api.request(GET_BYPARENT_API.format(parentNo, level), 'GET', null, successCb, errorCb, completeCb);
}

function getLevelOneAreas(successCb, errorCb, completeCb) {
  api.request(GET_LEVELONE_API, 'GET', null, successCb, errorCb, completeCb);
}

module.exports = {
  getAreaByParentNo: getAreaByParentNo,
  getLevelOneAreas: getLevelOneAreas
}