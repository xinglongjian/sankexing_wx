var api = require('./base.js');
var util = require('../utils/util.js')

var TEACHER_API = api.API_BASE + "/api/teacher"
var ADD_TO_SCHOOL_API = TEACHER_API + "/addToSchool"
var GET_SCHOOLS_API = TEACHER_API + "/schools/{0}"
var GET_GRADES_API = TEACHER_API + "/grades/{0}"


function addToSchool(data, successCb, errorCb, completeCb) {
  api.request(ADD_TO_SCHOOL_API, 'POST', data, successCb, errorCb, completeCb);
}

function getSchools(teacherId, successCb, errorCb, completeCb) {
  api.request(GET_SCHOOLS_API.format(teacherId), 'GET', null, successCb, errorCb, completeCb);
}

function getGrades(teacherId, successCb, errorCb, completeCb) {
  api.request(GET_GRADES_API.format(teacherId), 'GET', null, successCb, errorCb, completeCb);
}

module.exports = {
  addToSchool: addToSchool,
  getSchools: getSchools,
  getGrades: getGrades
}