wx.cloud.init() 
const db = wx.cloud.database();
const my_courses = db.collection('my_courses');
const courses_info = db.collection('courses_info');

const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    orderIds:[],
    orders:[],
    realPay:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "确认订单"
    });

    let orderIds = options.ids.split(",");
    console.log(orderIds)
    this.setData({
      userInfo : app.globalData.userInfo,
      orderIds: orderIds
    })

    console.log(options)
    console.log(options.ids)

    const promiseArr = orderIds.map(orderId => new Promise((resolve, reject) =>{
      wx.cloud.callFunction({
        name: 'getCart',
        data: {
          id: orderId
        }
      }).then(res =>{
        resolve(res.result.data[0]);
      })
    }))

    Promise
      .all(promiseArr)
      .then(data => {
        data = data.map((item)=>{
          return {
            id: item.id,
            ownername: item.ownername, 
            headImg: item.headImg,
            title: item.title,
            price: item.price,
            discount: item.discount,
            isSelected: false}
          })


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

  addMyCourse(){
    const orders = this.data.orders;

    for(let order of orders){
      let myCourse = {
        title:order.title,
        headImg:order.headImg,
        id:order.id
      }
      console.log(myCourse);    
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