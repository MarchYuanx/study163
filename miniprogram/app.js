App({

  onLaunch: function () {
    const userInfo = wx.getStorageSync('userInfo')

    this.globalData = {
      userInfo: userInfo || null,
      cart_coursesId:[],
    }  
  }

})
