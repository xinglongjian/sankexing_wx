//相册

var api = require('./base.js');
var util = require('../utils/util.js')

var ALBUM_API = api.API_BASE + "/api/album"
var ALBUM_ADD_API = ALBUM_API + "/add"
var ALBUM_UPLOAD_API = ALBUM_API + "/uploadAlbum"
var ALBUM_NEWUPLOAD_API = ALBUM_API + "/newUpload/{0}"
var ALBUM_GET_API = ALBUM_API + "/{0}"
var GET_SIMPLE_ALBUM_API = ALBUM_API + "/all/simple/{0}"

function addAlbum(data, successCb, errorCb, completeCb) {
  api.request(ALBUM_ADD_API, 'POST', data, successCb, errorCb, completeCb);
}
// function uploadAlbum(tempFilePath, name, formdata, successCb, errorCb, completeCb) { 
//   api.uploadFile(ALBUM_UPLOAD_API, tempFilePath, name, formdata, successCb, errorCb, completeCb);
// }
function uploadAlbum(tempFilePaths, name, formdata, successCb, errorCb, completeCb) {
  api.uploadFile(ALBUM_UPLOAD_API, tempFilePaths, name, formdata, successCb, errorCb, completeCb);
}

function getAlbum(id, successCb, errorCb, completeCb) {
  api.request(ALBUM_GET_API.format(id), 'GET', null, successCb, errorCb, completeCb);
}

function getNewUpload(id, successCb, errorCb, completeCb) {
  api.request(ALBUM_NEWUPLOAD_API.format(id), 'GET', null, successCb, errorCb, completeCb);
}

function getSimpleAlbum(id, successCb, errorCb, completeCb) {
  api.request(GET_SIMPLE_ALBUM_API.format(id), 'GET', null, successCb, errorCb, completeCb);
}

module.exports = {
  addAlbum: addAlbum,
  uploadAlbum: uploadAlbum,
  getAlbum: getAlbum,
  getSimpleAlbum: getSimpleAlbum,
  getNewUpload: getNewUpload
}