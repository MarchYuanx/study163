wx.cloud.init() 
const db = wx.cloud.database();
const course_cart = db.collection('course_cart');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    course_cart.where({id: "c3"}).get({
      success: res => {
        // console.log("---course_info---")
        console.log(res.data[0])
        this.setData({
          content: res.data[0]

        })
      }
    })
    
  },

 
})