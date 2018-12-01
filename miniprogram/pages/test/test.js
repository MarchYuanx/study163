wx.cloud.init() 
const db = wx.cloud.database();
const course_info = db.collection('course_info');

import { indexMock } from '../../utils/indexMock.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    result: 0,
    mainPage :{},
    t: true
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    indexMock("https://www.easy-mock.com/mock/5bda9d1a58caf84108172bab/study163/mainPage")
      .then(res => {
        console.log("res",res)
        this.setData({
          mainPage:res
        })
      })
      .then(res=>{
        console.log("mainpage",this.data.mainPage)
      })

  }

 
})