const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_courses:[],
    my_microSpecialty:[],
    status:1 ,//任务状态 
    image:"https://img-ph-mirror.nosdn.127.net/hk1QSosoKjxOqe8ZFfV_uA==/6632122197352709289.jpg?imageView&amp;quality=100&amp;thumbnail=224y126"
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
    this.setData({
      my_courses:app.globalData.my_courses,
      my_microSpecialty:app.globalData.my_microSpecialty
    })
  },


  swichTab: function(){
    wx.switchTab({
      url: '../index/index'
    });
  }
})