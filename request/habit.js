var api = require('./base.js');
var util = require('../utils/util.js')

var HABIT_API = api.API_BASE + "/api/habit"
var HABIT_TYPE_ADD_API = HABIT_API + "/addType"
var HABIT_ADD_API = HABIT_API + "/add"
var HABIT_TYPE_ALL_API = HABIT_API + "/allType"
var HABIT_BY_TYPE_API = HABIT_API + "/getHabitsByType/"
var getHabitPageApi = HABIT_API + "/type/{0}/name/{1}?pageNum={2}"
var GET_HABITS_API = HABIT_API + "/allByParams"
var GET_HABIT_By_ID_API = HABIT_API + "/{0}"
var addHabitToManyUserApi = HABIT_API + "/{0}/{1}"
var isHabitContainUserApi = HABIT_API + "/isExist/{0}/{1}"
var searchHabitQuestionApi = HABIT_API + "/question/search/{0}"
var addHabitQuestionApi = HABIT_API + "/question/add"
var getHabitQuestionApi = HABIT_API + "/question/{0}"
var addHabitQuestionItemApi = HABIT_API + "/question/item/add"
var getQuestionItemsApi = HABIT_API + "/question/items/{0}"
var getQuestionItemApi = HABIT_API + "/question/item/{0}"
var deleteQuestionItemApi = HABIT_API + "/question/item/{0}"
var getHabitQuestionRelationApi = HABIT_API + "/question/relations/{0}"
var deleteHabitQuestionRelationApi = HABIT_API + "/question/relation/{0}/{1}"
var addQutestionToHabitApi = HABIT_API + "/question/relation/add/{0}"
var getHabitQuestionDetailApi = HABIT_API + "/question/details/{0}"

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
  api.request(HABIT_BY_TYPE_API + typeId, 'GET', null, successCb, errorCb, completeCb);
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
/**
 * 判断用户是否已添加该习惯
 */
function isHabitContainUser(habitId, userId, successCb, errorCb, completeCb) {
  api.request(isHabitContainUserApi.format(habitId, userId), 'GET', null, successCb, errorCb, completeCb);
}

/**
 * 通过title模糊查询问题
 */
function searchHabitQuestion(title, successCb, errorCb, completeCb) {
  api.request(searchHabitQuestionApi.format(title), 'GET', null, successCb, errorCb, completeCb);
}
/**
 * 添加习惯问题
 */
function addHabitQuestion(data, successCb, errorCb, completeCb) {
  api.request(addHabitQuestionApi, 'post', data, successCb, errorCb, completeCb);
}

/**
 * 获取习惯问题
 */
function getHabitQuestion(id, successCb, errorCb, completeCb) {
  api.request(getHabitQuestionApi.format(id), 'get', null, successCb, errorCb, completeCb);
}
/**
 * 分页获取习惯
 */
function getHabitPage(typeId, name, pageNum, successCb, errorCb, completeCb) {
  api.request(getHabitPageApi.format(typeId, name, pageNum), 'get', null, successCb, errorCb, completeCb);
}

/**
 * 添加习惯选项问题
 */
function addHabitQuestionItem(data, successCb, errorCb, completeCb) {
  api.request(addHabitQuestionItemApi, 'post', data, successCb, errorCb, completeCb);
}

/**
 * 用于获取问题列表
 */
function getQuestionItems(questionId, successCb, errorCb, completeCb) {
  api.request(getQuestionItemsApi.format(questionId), 'get', null, successCb, errorCb, completeCb);
}

/**
 * 用于获取单个问题选项
 */
function getQuestionItem(id, successCb, errorCb, completeCb) {
  api.request(getQuestionItemApi.format(id), 'get', null, successCb, errorCb, completeCb);
}
/**
 * 用于获取单个问题选项
 */
function deleteQuestionItem(id, successCb, errorCb, completeCb) {
  api.request(deleteQuestionItemApi.format(id), 'DELETE', null, successCb, errorCb, completeCb);
}
/**
 * 用于获取单个习惯的问题列表
 */
function getHabitQuestionRelationByHabitId(habitId, successCb, errorCb, completeCb) {
  api.request(getHabitQuestionRelationApi.format(habitId), 'GET', null, successCb, errorCb, completeCb);
}
/**
 * 用于删除单个习惯的问题
 */
function deleteHabitQuestionRelation(habitId,questionId, successCb, errorCb, completeCb) {
  api.request(deleteHabitQuestionRelationApi.format(habitId, questionId), 'DELETE', null, successCb, errorCb, completeCb);
}
/**
 * 用于获取单个习惯的问题列表
 */
function addQutestionToHabit(habitId, questionIds,successCb, errorCb, completeCb) {
  api.request(addQutestionToHabitApi.format(habitId), 'POST', questionIds, successCb, errorCb, completeCb);
}
/**
 * 用于获取单个习惯的问题详情
 */
function getHabitQuestionDetail(habitId, successCb, errorCb, completeCb) {
  api.request(getHabitQuestionDetailApi.format(habitId), 'GET', null, successCb, errorCb, completeCb);
}

module.exports = {
  habitTypeAdd: habitTypeAdd,
  habitAdd: habitAdd,
  getAllType: getAllType,
  getHabitByType: getHabitByType,
  getHabits: getHabits,
  getHabitPage: getHabitPage,
  getHabitById: getHabitById,
  addHabitToManyUser: addHabitToManyUser,
  isHabitContainUser: isHabitContainUser,
  searchHabitQuestion: searchHabitQuestion,
  addHabitQuestion: addHabitQuestion,
  getHabitQuestion: getHabitQuestion,
  addHabitQuestionItem: addHabitQuestionItem,
  getQuestionItems: getQuestionItems,
  getQuestionItem: getQuestionItem,
  deleteQuestionItem: deleteQuestionItem,
  getHabitQuestionRelationByHabitId:getHabitQuestionRelationByHabitId,
  deleteHabitQuestionRelation:deleteHabitQuestionRelation,
  addQutestionToHabit: addQutestionToHabit,
  getHabitQuestionDetail: getHabitQuestionDetail
}