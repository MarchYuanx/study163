const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_courses:[],
    my_microSpecialty:[],
    status:1 ,//任务状态 
  },
  onLoad:function(){
    wx.setNavigationBarTitle({
      title: "我的学习"
    })
  },
  showStatus: function(e){
    let status = e.currentTarget.dataset.status;
    this.setData({
      status:status
    })
  },
  onShow:function(){
    wx.cloud.callFunction({
      name: 'getMyCourse',
    }).then(res=>{
      this.setData({
        my_courses: res.result.data
      })
    })
  },


  swichTab: function(){
    wx.switchTab({
      url: '../index/index'
    });
  }
})