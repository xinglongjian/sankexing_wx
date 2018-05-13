var api = require('./base.js');
var util = require('../utils/util.js')

var SCHOOL_API = api.API_BASE + "/api/school"
var SCHOOL_ADD_API = SCHOOL_API + "/add"
var SCHOOL_QUERY_API = SCHOOL_API + "/query"
var SCHOOL_GET_API = SCHOOL_API + "/{0}"

function querySchool(data, successCb, errorCb, completeCb) {
  api.request(SCHOOL_QUERY_API, 'GET',data , successCb, errorCb, completeCb);
}
function getSchool(id, successCb, errorCb, completeCb) {
  api.request(SCHOOL_GET_API.format(id), 'GET', null, successCb, errorCb, completeCb);
}

module.exports = {
  querySchool: querySchool,
  getSchool: getSchool
}