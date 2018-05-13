var api = require('./base.js');
var util = require('../utils/util.js')

var GRADE_API = api.API_BASE + "/api/grade"
var ADD_GRADE_API = GRADE_API + "/add"
var GET_GRADE_API = GRADE_API + "/{0}"
var GET_GRADE_BY_SCHOOL_API = GRADE_API + "/getBySchool/{0}"
var GET_TEACHER_OF_GRADE_API = GRADE_API + "/teachers/{0}"
var GET_STUDENT_OF_GRADE_API = GRADE_API + "/students/{0}"


function addGrade(data, successCb, errorCb, completeCb) {
  api.request(ADD_GRADE_API, 'POST', data, successCb, errorCb, completeCb);
}

function getGrade(id, successCb, errorCb, completeCb) {
  api.request(GET_GRADE_API.format(id), 'GET', null, successCb, errorCb, completeCb);
}

function getGradesBySchool(schoolId, successCb, errorCb, completeCb) {
  api.request(GET_GRADE_BY_SCHOOL_API.format(schoolId), 'GET', null, successCb, errorCb, completeCb);
}

function getTeachersByGrade(gradeId, successCb, errorCb, completeCb) {
  api.request(GET_TEACHER_OF_GRADE_API.format(gradeId), 'GET', null, successCb, errorCb, completeCb);
}

function getStudentsByGrade(gradeId, successCb, errorCb, completeCb) {
  api.request(GET_STUDENT_OF_GRADE_API.format(gradeId), 'GET', null, successCb, errorCb, completeCb);
}

module.exports = {
  addGrade: addGrade,
  getGrade: getGrade,
  getGradesBySchool: getGradesBySchool,
  getTeachersByGrade: getTeachersByGrade,
  getStudentsByGrade: getStudentsByGrade
}