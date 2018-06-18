var api = require('./base.js');
var util = require('../utils/util.js')

var HABIT_API = api.API_BASE + "/api/habit"
var HABIT_TYPE_ADD_API = HABIT_API + "/addType"
var HABIT_ADD_API = HABIT_API + "/add"
var HABIT_TYPE_ALL_API = HABIT_API + "/allType"
var HABIT_BY_TYPE_API = HABIT_API + "/getHabitsByType/"
var GET_HABITS_API = HABIT_API + "/allByParams"
var GET_HABIT_By_ID_API = HABIT_API + "/{0}"
var addHabitToManyUserApi = HABIT_API + "/{0}/{1}"

/**
 * 添加习惯大类
 */
function habitTypeAdd(data, successCb, errorCb, completeCb) {
  api.request(HABIT_TYPE_ADD_API, 'POST', data, successCb, errorCb, completeCb);
}

function habitAdd(data, successCb, errorCb, completeCb) {
  api.request(HABIT_ADD_API, 'POST', data, successCb, errorCb, completeCb);
}

function getAllType(successCb, errorCb, completeCb) {
  api.request(HABIT_TYPE_ALL_API, 'GET', null, successCb, errorCb, completeCb);
}

function getHabitByType(typeId, successCb, errorCb, completeCb) {
  api.request(HABIT_BY_TYPE_API+typeId, 'GET', null, successCb, errorCb, completeCb);
}

function getHabits(params, successCb, errorCb, completeCb) {
  api.request(GET_HABITS_API, 'GET', params, successCb, errorCb, completeCb);
}

function getHabitById(id, successCb, errorCb, completeCb) {
  api.request(GET_HABIT_By_ID_API.format(id), 'GET', null, successCb, errorCb, completeCb);
}

function addHabitToManyUser(habitId, addUserId, userIds, successCb, errorCb, completeCb) {
  api.request(addHabitToManyUserApi.format(habitId, addUserId), 'POST', userIds, successCb, errorCb, completeCb);
}

module.exports = {
  habitTypeAdd: habitTypeAdd,
  habitAdd: habitAdd,
  getAllType: getAllType,
  getHabitByType: getHabitByType,
  getHabits: getHabits,
  getHabitById: getHabitById,
  addHabitToManyUser: addHabitToManyUser
}