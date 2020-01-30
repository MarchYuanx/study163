const app = getApp()

Page({

  data: {
    userInfo: null,
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onShareAppMessage: function (res) {
    
    //右上角分享
    return {
      title: '分享课程~',
      path: `pages/index/index`,
      imageUrl: `../../images/blank.png`,
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
    wx.setNavigationBarTitle({
      title: "账号"
    })


    wx.showShareMenu()
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onShow: function () {
    const userInfo = app.globalData.userInfo
    if(userInfo === null){
      wx.navigateTo({
        url: '../login/login'
      }) 
    }else if(this.data.userInfo === null){
      console.log('[userInfo]',userInfo)   
      this.setData({
        userInfo: userInfo,
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


