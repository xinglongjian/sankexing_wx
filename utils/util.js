const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}
const formatHM = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}

const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function isFunction(obj) {
  return typeof obj === 'function';
}

function parseInteger(val) {
  if (isNaN(val))
    return 0;
  return parseInt(val);
}

String.prototype.format = function (args) {
  var result = this;
  if (arguments.length > 0) {
    if (arguments.length == 1 && typeof (args) == "object") {
      for (var key in args) {
        if (args[key] != undefined) {
          var reg = new RegExp("({" + key + "})", "g");
          result = result.replace(reg, args[key]);
        }
      }
    }
    else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] != undefined) {
          var reg = new RegExp("({)" + i + "(})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
  }
  return result;
}
String.format = function () {
  if (arguments.length == 0)
    return null;

  var str = arguments[0];
  for (var i = 1; i < arguments.length; i++) {
    var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
    str = str.replace(re, arguments[i]);
  }
  return str;
}
/**
 * 查找该value在数组中的索引，通过code判断一致性
 */
function indexOf(arr,code,value) {
  var len = arr.length;
  for(var i = 0;i<len;i++){
    if(arr[i][code] == value) {
      return i;
    }
  }
}


module.exports = {
  formatDateTime: formatDateTime,
  isFunction: isFunction,
  parseInteger: parseInteger,
  formatDate: formatDate,
  formatTime: formatTime,
  formatHM: formatHM,
  indexOf: indexOf
}
