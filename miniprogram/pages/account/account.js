const app = getApp()

Page({

  data: {
    userInfo: null,
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
    wx.setNavigationBarTitle({
      title: "账号"
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShow: function () {
    if(app.globalData.userInfo === null){
      wx.navigateTo({
        url: '../login/login'
      }) 
    }else if(this.data.userInfo === null){
      console.log('[userInfo]',app.globalData.userInfo)   
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })

    }

  },
  getUserInfo: function(e) {

    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    
  },



  toCart(){
    wx.navigateTo({
      url: '../cart/cart'
    })
  },

  toOrder(){
    wx.navigateTo({
      url: '../order/order'
    })
  }

})


