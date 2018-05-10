var api = require('./base.js');
var util = require('../utils/util.js')

var SCHOOL_API = api.API_BASE + "/api/school"
var SCHOOL_ADD_API = SCHOOL_API + "/add"
var SCHOOL_QUERY_API = SCHOOL_API + "/query"

function querySchool(data, successCb, errorCb, completeCb) {
  api.request(SCHOOL_QUERY_API, 'GET',data , successCb, errorCb, completeCb);
}

// function addSchool(data,successCb, errorCb, completeCb) {
//   api.request(SCHOOL_ADD_API, 'POST', data, successCb, errorCb, completeCb);
// }

module.exports = {
  querySchool: querySchool
  // addSchool: addSchool
}