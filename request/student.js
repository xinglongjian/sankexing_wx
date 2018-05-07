var api = require('./base.js');
var util = require('../utils/util.js')

var STUDENT_API = api.API_BASE + "/api/student"
var ADD_TO_SCHOOL_API = STUDENT_API + "/addToSchool"


function addToSchool(data, successCb, errorCb, completeCb) {
  api.request(ADD_TO_SCHOOL_API, 'POST', data, successCb, errorCb, completeCb);
}

module.exports = {
  addToSchool: addToSchool
}