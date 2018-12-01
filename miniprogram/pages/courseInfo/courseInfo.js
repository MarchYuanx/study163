// miniprogram/pages/courseInfo/courseInfo.js
// wx.cloud.init() 
// const db = wx.cloud.database();
// const course_info = db.collection('course_info');

const app = getApp()

import { viewContent } from '../../utils/viewContent.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    status: 1,
    starMap:[0,1,2,3,4],
    content:{},
    viewDesc:[],
    viewTarget:[],
    // title:"",
    cart_coursesId:[],
    isPaid :false,
    expert:{
      "avatarURL": "http://edu-image.nosdn.127.net/CFD2999B76C502CF3B0CAEAD4375174A.jpg?imageView&amp;thumbnail=120y120&amp;quality=100" ,
      "intro": "行家是云课堂优秀讲师推荐栏目。在这个栏目中，我们将优选课程内容优质、教学水平优秀、对学生负责的优秀讲师和讲师团队，为用户学习高质量内容提供建议。",
      "name": "云课堂行家"

    }
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
    console.log(options);

    wx.showLoading({
      title: '数据加载中...'
    });

    this.setData({
      cart_coursesId: app.globalData.cart_coursesId,
      id: options.id
    })

    wx.cloud.callFunction({
      // 云函数名称
      name: 'getCourseInfo',
      // 传给云函数的参数
      data: {
        id: options.id
      }
    })
    .then(res => {
      console.log(res.result.data[0]) // 3

        wx.setNavigationBarTitle({
        title: res.result.data[0].title
      })

      this.setData({
        content: res.result.data[0],
        viewDesc: viewContent(res.result.data[0].desc),
        viewTarget: viewContent(res.result.data[0].targetPerson)
      })

      wx.hideLoading()

    })
    .catch(console.error)
  
/*  end */


  wx.cloud.callFunction({
    name: 'getMyCourse',
  }).then(res=>{
        for(const my_course of res.result.data){
          if(options.id === my_course.id){
            let isPaid = true;
            this.setData({
              isPaid
            })
            return ;
          }
        } 
    })

  },

  onClickIcon: function(e){
    const id = e.currentTarget.dataset.id;
    const cart_coursesId = this.data.cart_coursesId;

    
    for(const cart_courseId of cart_coursesId){
      if(id === cart_courseId){
        wx.showToast({
          icon:"none",
          title:"已添加"
        })
        return ;
      }
    }
    
    app.globalData.cart_coursesId.push(id);

    console.log('[app.globalData.cart_coursesId]',app.globalData.cart_coursesId)
   

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
   
    

    

  }


  
})