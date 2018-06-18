// pages/find/index.js
//---引入第三方---
import {
  $wuxFilterBar
} from '../../third/wux/dist/components/wux'
var account = require('../../request/accounts.js')
var habitapi = require('../../request/habit.js')
var utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['习惯', '训练', '赛事', '商城'],
    currentTab: 0,
    movies: [{
      url: 'http://img04.tooopen.com/images/20130712/tooopen_17270713.jpg'
    },
    {
      url: 'http://img04.tooopen.com/images/20130617/tooopen_21241404.jpg'
    },
    {
      url: 'http://img04.tooopen.com/images/20130701/tooopen_20083555.jpg'
    },
    {
      url: 'http://img02.tooopen.com/images/20141231/sy_78327074576.jpg'
    }
    ],
    habits: [],
    childId: 0,
    //
    pageStyle: undefined,
    items: [{
      type: 'sort',
      label: '参加人数',
      value: 'stars',
      groups: ['001'],
    }, {
      type: 'radio',
      label: '分类',
      value: 'updated',
      children: [{
        label: 'Recently updated',
        value: 'desc',
      },
      {
        label: 'Least recently updated',
        value: 'asc',
      },
      ],
      groups: ['002'],
    }, {
      type: 'text',
      label: 'Forks',
      value: 'forks',
      groups: ['003'],
    }, {
      type: 'filter',
      label: '筛选',
      value: 'filter',
      children: [{
        type: 'radio',
        label: 'Languages（单选）',
        value: 'language',
        children: [{
          label: 'JavaScript',
          value: 'javascript',
        },
        {
          label: 'HTML',
          value: 'html',
        },
        {
          label: 'CSS',
          value: 'css',
        },
        {
          label: 'TypeScript',
          value: 'typescript',
        },
        ],
      },
      {
        type: 'checkbox',
        label: 'Query（复选）',
        value: 'query',
        children: [{
          label: 'Angular',
          value: 'angular',
        },
        {
          label: 'Vue',
          value: 'vue',
        },
        {
          label: 'React',
          value: 'react',
        },
        {
          label: 'Avalon',
          value: 'avalon',
        },
        ],
      },
      {
        type: 'checkbox',
        label: '配送方式',
        value: 'away',
        children: [{
          label: '京东配送',
          value: '1',
        },
        {
          label: '货到付款',
          value: '2',
        },
        {
          label: '仅看有货',
          value: '3',
        },
        {
          label: '促销',
          value: '4',
        },
        {
          label: '全球购',
          value: '5',
        },
        {
          label: 'PLUS专享价',
          value: '6',
        },
        {
          label: '新品',
          value: '7',
        },
        {
          label: '配送全球',
          value: '8',
        },
        ],
      },
      {
        type: 'radio',
        label: '性别',
        value: 'gander',
        children: [{
          label: '男',
          value: '0',
        },
        {
          label: '女',
          value: '1',
        },
        {
          label: '通用',
          value: '2',
        },
        ],
      },
      {
        type: 'checkbox',
        label: '闭合方式',
        value: 'closed_mode',
        children: [{
          label: '卡扣',
          value: '0',
        },
        {
          label: '拉链',
          value: '1',
        },
        {
          label: '其他',
          value: '2',
        },
        ],
      },
      {
        type: 'checkbox',
        label: '轮子种类',
        value: 'wheel_type',
        children: [{
          label: '万向轮',
          value: '0',
        },
        {
          label: '单向轮',
          value: '1',
        },
        {
          label: '飞机轮',
          value: '2',
        },
        {
          label: '其他',
          value: '3',
        },
        ],
      },
      {
        type: 'checkbox',
        label: '箱包硬度',
        value: 'wheel_type',
        children: [{
          label: '硬箱',
          value: '0',
        },
        {
          label: '软硬结合',
          value: '1',
        },
        {
          label: '软箱',
          value: '2',
        },
        {
          label: '其他',
          value: '3',
        },
        ],
      },
      {
        type: 'checkbox',
        label: '适用场景',
        value: 'wheel_type',
        children: [{
          label: '旅行',
          value: '0',
        },
        {
          label: '婚庆',
          value: '1',
        },
        {
          label: '出差',
          value: '2',
        },
        {
          label: '其他',
          value: '3',
        },
        ],
      },
      ],
      groups: ['001', '002', '003'],
    },],
  },

  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },

  /**
   * 切换到课程页面
   */
  navToClasses: function (e) {
    wx.navigateTo({
      url: '../classes/index'
    })
  },

  /**
   * 切换到习惯页面
   */
  navToHabit: function (e) {
    var habitId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/habits/habit/index?habitId=' + habitId + '&childId=' + this.data.childId
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var childId = options.childId;
    this.setData({
      childId: childId == undefined ? 0 : childId
    })
    this.$wuxFilterBar = $wuxFilterBar.init({
      items: this.data.items,
      onChange: (checkedItems, items) => {
        console.log(this, checkedItems, items)
        const params = {}
        checkedItems.forEach((n) => {
          if (n.checked) {
            if (n.value === 'updated') {
              const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
              params.sort = n.value
              params.order = selected
            } else if (n.value === 'stars') {
              params.sort = n.value
              params.order = n.sort === 1 ? 'asc' : 'desc'
            } else if (n.value === 'forks') {
              params.sort = n.value
            } else if (n.value === 'filter') {
              n.children.filter((n) => n.selected).forEach((n) => {
                if (n.value === 'language') {
                  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                  params.language = selected
                } else if (n.value === 'query') {
                  const selected = n.children.filter((n) => n.checked).map((n) => n.value).join(' ')
                  params.query = selected
                }
              })
            }
          }
        })

        this.getHabits(params)
      },
      onScroll(e) {
        console.log('onScroll', e)
        this.setData({
          pageStyle: 'height: 100vh; overflow: hidden;',
        })
      },
    })
    this.getHabits()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /** 
   * 按数量排序
   */
  getHabits: function () {
    this.$wuxFilterBar.onCloseSelect()
    wx.showLoading();
    var that = this;
    habitapi.getHabits(null, function (res) {
      wx.hideLoading();
      that.setData({
        habits: res.data
      })
    }, function () {
      console.log("error")
    });
  }

})