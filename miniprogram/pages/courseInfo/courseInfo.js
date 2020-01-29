
const app = getApp()

import { viewContent } from '../../utils/viewContent.js';
import { formatTime } from '../../utils/formatTime';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:"",
    status: 1,
    content:{},
    userInfo:null,
    viewDesc:[],
    viewTarget:[],
    // title:"",
    cart_coursesId:[],
    isPaid :false,
    expert:{
      "avatarURL": "http://edu-image.nosdn.127.net/CFD2999B76C502CF3B0CAEAD4375174A.jpg?imageView&amp;thumbnail=120y120&amp;quality=100" ,
      "intro": "行家是云课堂优秀讲师推荐栏目。在这个栏目中，我们将优选课程内容优质、教学水平优秀、对学生负责的优秀讲师和讲师团队，为用户学习高质量内容提供建议。",
      "name": "云课堂行家"
    },
    comment:[],
    videoList: [],
    videoSrc: ""
  },
  showStudy(){
    if(this.status != '2'){
      this.setData({
        status:'2'
      })
    } 
  },
  showStatus: function(e){
    let status = e.currentTarget.dataset.status;
    if(status === '3'){
      wx.showLoading({
        title: '评论加载中...'
      });
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getComment',
        // 传给云函数的参数
        data: {
          id: this.data.id
        }
      })
      .then(res => {
        if(res.result.data.length > 0){
          console.log("[getComment]",res.result.data) 
          this.setData({
            comment: res.result.data[0].comment.map(item => {return  {...item, time : formatTime(item.time)} })
          })
        }
      })
      .catch(console.error)
      wx.hideLoading()
    }
    
    this.setData({
      status:status
    })
  },
  showVideo: function(e){
    let index = e.currentTarget.dataset.index;
    console.log('[showVideo] video', index+1)
    this.setData({
      videoSrc: this.data.videoList[index].src
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
      // cart_coursesId: app.globalData.cart_coursesId,
      // userInfo: app.globalData.userInfo,
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
    // 云函数名称
    name: 'getVideoList',
    // 传给云函数的参数
    data: {
      id: options.id
    }
  })
  .then(res => {
    if(res.result.data.length > 0){
      console.log("[getVideoList]",res.result.data[0]) 
      this.setData({
        videoList: res.result.data[0].videoList
      })
    }
  })
  .catch(console.error)

  
  
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
  
  videoErrorCallback: function(e) {
    console.log('视频错误信息:');
    console.log(e.detail.errMsg);
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
    this.setData({
      cart_coursesId: app.globalData.cart_coursesId,
      userInfo: app.globalData.userInfo
    })

    if(app.globalData.userInfo != null && this.data.isPaid === false){
      wx.cloud.callFunction({
        name: 'getMyCourse',
      }).then(res=>{
            for(const my_course of res.result.data){
              if(this.data.id === my_course.id){
                let isPaid = true;
                this.setData({
                  isPaid
                })
                return ;
              }
            } 
        })
    }
  },
  login(){
    wx.navigateTo({
      url: '../login/login'
    })
  }
  
})