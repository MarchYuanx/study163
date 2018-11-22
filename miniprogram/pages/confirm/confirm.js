wx.cloud.init() 
const db = wx.cloud.database();
const course_cart = db.collection('course_cart');
const my_courses = db.collection('my_courses');

const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    orderIds:[],
    orders:[],
    realPay:0,
    test:{
    "image":"https://edu-image.nosdn.127.net/43e27d1e-021c-49e5-a7da-bae92cefb786.jpg?imageView&amp;quality=100&amp;crop=0_0_879_495&amp;thumbnail=240y150",
    "title": "来自福布斯精英的25节金融思维课",
    "time":"永久有效",
    "price":99,
    "oprice":199,
    "name": "文豪金融"}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "确认订单"
    });

    console.log(options)
    console.log(options.ids)


    let orderIds = options.ids.split(",");
    console.log(orderIds)
    this.setData({
      userInfo : app.globalData.userInfo,
      orderIds: orderIds
    })

    const promiseArr = orderIds.map(orderId => new Promise((resolve, reject) =>{
      course_cart.where({id: orderId}).get({
        success: (res) =>{
          resolve(res.data[0]);
          // temp_courses.push();          
        }
      })
    }))

    Promise
      .all(promiseArr)
      .then(data => {
        let total = 0;
        for(let item of data){
          total+=item.price-item.discount;
        }
        console.log("total",total)
        this.setData({
          orders: data,
          realPay: total
        })
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  addMyCourse(){
    

    const orders = this.data.orders;
    for(let order of orders){
      let myCourse = {
        title:order.title,
        image:order.image,
        id:order.id
      }
      console.log(myCourse);    
      app.globalData.my_courses.push(myCourse);
      my_courses.add({data:myCourse})
    }

  },

  submit:function(){


    this.addMyCourse();





    wx.showToast({
      title:"提交成功",
      duration: 800

    });
    
    setTimeout(()=>{
      wx.switchTab({
        url: '../myStudy/myStudy'
      });
    },1000)
    
    

      


    

  }
})