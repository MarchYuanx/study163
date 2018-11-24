wx.cloud.init() 
const db = wx.cloud.database();
const course_info = db.collection('course_info');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    result: 0
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('---test---')

    wx.cloud.callFunction({
      name: 'updateHot',
      data: {
        id: "c1"
      }
    }).then(res =>{
      console.log(res)
      console.log(res.result)
     
    })

  }

 
})