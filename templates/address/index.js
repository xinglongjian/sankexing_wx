// model.js
const address = require('../../request/address.js')

var areaInfo = [];//所有省市区县数据

var provinces = [];//省

var citys = [];//城市

var areas = [];//区县

var value = [0, 0, 0];//数据位置下标

var info = {};

function updateAreaData(that, status, e) {
  if (status == 0) {
    //获取省份数据
    getProvinceArr();
  }
  //滑动事件
  else {
    valueChange(e, that);
  }

  animationEvents(that, 200, false, 0);
}

var getProvinceArr = function () {
  address.getLevelOneAreas(function (res) {
    provinces = res.data;
    //获取地级市数据
    getCityArr();
  });
  
  //模型赋值
  info = {
    item: {
      provinces: provinces,
      citys: citys,
      areas: areas,
      value: value
    }
  }

}

// 获取地级市数据
var getCityArr = function (provinceIndex = 0) {
  var province = provinces[provinceIndex];
  address.getAreaByParentNo(province.no, 2, function (res) {
    citys = res.data;
    getAreaArr();
  }, function () {

  });
}

var getAreaArr = function (provinceIndex = 0, cityIndex = 0) {
  var city = citys[cityIndex];
  address.getAreaByParentNo(city.no, 3, function (res) {
    areas = res.data;
    value = [provinceIndex, cityIndex, 0];
  });
}



//滑动事件
var valueChange = function (e, that) {
  var val = e.detail.value
  console.log(e)
  //判断滑动的是第几个column
  //若省份column做了滑动则定位到地级市和区县第一位
  if (value[0] != val[0]) {
    val[1] = 0;
    val[2] = 0;
    getCityArr(val[0]);//获取地级市数据
    getAreaArr(val[0], val[1]);//获取区县数据
  } else {    //若省份column未做滑动，地级市做了滑动则定位区县第一位
    if (value[1] != val[1]) {
      val[2] = 0;
      getAreaArr(val[0], val[1]);//获取区县数据
    }
  }
  value = val;

  assignmentData(that, that.data.item.show)

  console.log(val);

}

//动画事件
function animationEvents(that, moveY, show, duration) {
  console.log("moveY:" + moveY + "\nshow:" + show);
  that.animation = wx.createAnimation({
    transformOrigin: "0 100%",
    duration: duration,
    timingFunction: "ease",
    delay: 0
  })
  that.animation.translateY(moveY + 'vh').step()
  //赋值
  assignmentData(that, show)

}
//赋值
function assignmentData(that, show) {
  that.setData({
    item: {
      animation: that.animation.export(),
      show: show,
      provinces: provinces,
      citys: citys,
      areas: areas,
      value: value
    }
  })
}

module.exports = {
  updateAreaData: updateAreaData,
  animationEvents: animationEvents
}