// miniprogram/pages/cart/cart.js
wx.cloud.init() 
const db = wx.cloud.database();
const course_cart = db.collection('course_cart');

const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursesId:[],
    courses:[],  
    totalPrice:0,
    selectedCourses:[],
    selectAllStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let cart_coursesId = app.globalData.cart_coursesId;
    this.data.coursesId = cart_coursesId;

    console.log('coursesId ',this.data.coursesId) 

    wx.showLoading({
      title: '数据加载中...'
    });
    // return;

    const promiseArr = cart_coursesId.map(course => new Promise((resolve, reject) =>{
      course_cart.where({id: course}).get({
        success: (res) =>{
          resolve(res.data[0]);
          // temp_courses.push();          
        }
      })
    }))

    Promise
      .all(promiseArr)
      .then(data => {
        console.log(data);
        wx.hideLoading()
        this.setData({
          courses: data
        })
      })   
  },

  getTotalPrice: function(){
    let courses = this.data.courses;
    let total = 0;
    for(let i=0;i<courses.length;i++){
      if(courses[i].isSelected){
        total += courses[i].price;
      }      
    }

    this.setData({
      totalPrice:total
    })
    console.log('[total]',total);
    return total;
  },
  selectedList:function(e){
    const index = e.currentTarget.dataset.index;
    const courses = this.data.courses;
    courses[index].isSelected = !courses[index].isSelected;
    
    this.setData({
      courses
    })
  
    this.getTotalPrice();
  },
  deleteList:function(e){
    let index = e.currentTarget.dataset.index;
    let courses = this.data.courses;
    let coursesId = this.data.coursesId;
    courses = courses.filter((course,i)=>{
      return index!=i;
    })
    coursesId = coursesId.filter((courseId,i)=>{
      return index!=i;
    })

    app.globalData.cart_coursesId = app.globalData.cart_coursesId.filter((courseId,i)=>{
      return index!=i;
    })
    
    console.log('coursesId',coursesId);
    console.log('app.globalData.cart_coursesId',app.globalData.cart_coursesId);


    this.setData({
      courses,
      coursesId
    })

    this.getTotalPrice();

  },
  selectAll:function(e){
    let courses = this.data.courses;
    let selectAllStatus = this.data.selectAllStatus;
    selectAllStatus = !selectAllStatus;

    courses.forEach((item, index) => {
      item.isSelected = selectAllStatus
    })

    this.setData({
      courses,
      selectAllStatus
    })


    this.getTotalPrice();
  },
  confirm:function(){
    wx.navigateTo({
      url: '../confirm/confirm'
    })
  }
  
})