// miniprogram/pages/myStudy/myStudy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curLists:[],
    status:1 //任务状态 1全部 2未完成 3已完成
  },
  showStatus: function(e){
    let status = e.currentTarget.dataset.status;
    this.setData({
      status:status
    })
  },


  swichTab: function(){
    wx.switchTab({
      url: '../index/index'
    });
  }
})