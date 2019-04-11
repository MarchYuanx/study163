const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    coursesId:[],
    courses:[],  
    totalPrice:0,
    selectedId:[],
    selectAllStatus: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "我的购物车"
    })

    let cart_coursesId = app.globalData.cart_coursesId;
    this.data.coursesId = cart_coursesId;

    console.log('coursesId ',this.data.coursesId) 

    wx.showLoading({
      title: '数据加载中...'
    });

  const promiseArr = cart_coursesId.map(course => new Promise((resolve, reject) =>{
    wx.cloud.callFunction({
      name: 'getCart',
      data: {
        id: course
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
            isSelected: false}
          })

        console.log('[data]',data);
        wx.hideLoading()
        this.setData({
          courses: data
        })
      })   
  },

  getTotalPrice: function(){
    let courses = this.data.courses;
    let total = 0;
    let selectedId = [];
    for(let i=0;i<courses.length;i++){
      if(courses[i].isSelected){
        total += courses[i].price;
        selectedId.push(courses[i].id)
      }      
    }

    this.setData({
      totalPrice:total,
      selectedId
    })
    console.log('[total]',total);
    console.log('[selected]',selectedId);
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
    this.deleteCart();

  },

  deleteCart:function(){
    let selectedId = this.data.selectedId;
    let coursesId = this.data.coursesId;

    app.globalData.cart_coursesId = app.globalData.cart_coursesId.filter(function (id) {
      return selectedId.indexOf(id) < 0;
    })
  },
  
  
})