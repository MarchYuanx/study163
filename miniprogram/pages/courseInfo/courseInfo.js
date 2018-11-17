// miniprogram/pages/courseInfo/courseInfo.js
wx.cloud.init() 
const db = wx.cloud.database();
const course_info = db.collection('course_info');


const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 1,
    content:{},
    title:"",
    cart_courses: app.globalData.cart_courses
    
  },
  showStatus: function(e){
    let status = e.currentTarget.dataset.status;
    this.setData({
      status:status
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('---options---')
    console.log('options',options)
    console.log('cart_courses',this.data.cart_courses)

    // course_info.get({
    //   success: function(res) {
    //     // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
    //     console.log(res.data)
    //   }
    // })

    course_info.where({id: options.id}).get({
      success: res => {
        // console.log("---course_info---")
        // console.log(res.data[0])
        this.setData({
          content: res.data[0]

        })
      }
    })
    
  },

  onClickIcon: function(e){
    const id = e.currentTarget.dataset.id;
    const cart_courses = this.data.cart_courses;

    for(const cart_course of cart_courses){
      if(id === cart_course){
        wx.showToast({
          icon:"none",
          title:"已添加"
        })
        return ;
      }
    }
    
    this.data.cart_courses.push(id);
    app.globalData.cart_courses.push(id);


    console.log(app.globalData)
   

    wx.showToast({
      icon:"none",
      title:"成功添加到购物车"
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }

  
})