// pages/user/info/index.js
const app = getApp()
Page({
  data: {
    userInfo: null,
  },
  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },
  bindDateChange(e) {
    let {
      value
    } = e.detail;
    this.setData({
      "userInfo.birthDay": value
    })
  },
  formSubmit: function(e) {
    let _this = this
    wx.showLoading({
      title: '提交中',
      mask: true
    })
    app.formPost('/api/wx/student/user/update', e.detail.value)
      .then(res => {
        if (res.code == 1) {
          app.globalData.userInfo = res.response
          wx.reLaunch({
            url: '/pages/my/index/index',
          });
        } else {
          app.message(res.message, 'error')
        }
        wx.hideLoading()
      }).catch(e => {
        app.message(e, 'error')
        wx.hideLoading()
      })
  }
})