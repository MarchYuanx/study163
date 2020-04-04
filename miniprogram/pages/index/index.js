import { indexMock } from '../../utils/indexMock.js';

const app = getApp();

const db = wx.cloud.database();

Page({
  data: {
    mainPage:{},
    url:"https://www.fastmock.site/mock/d0458f8d6737fec913f5decca8db680c/study163/courses",
    ads: [],
    icons: []
  },
  getDB(){

    //获取swiper数据
    db.collection('swiper').limit(6).get()
    .then(res=>{
      console.log('swiper data',res.data)
      this.setData({
        ads: res.data
      })
    })
    .catch(err=>{
      console.log(err)
    })

    //获取icon数据
    db.collection('icon').limit(8).get()
    .then(res=>{
      console.log('icon data',res.data)
      this.setData({
        icons: res.data
      })
    })
    .catch(err=>{
      console.log(err)
    })
  },

  onLoad() {
    const url = this.data.url;
    indexMock(url)
      .then(res => {
        console.log(res)
        this.setData({
          mainPage:res
        })
      })
      .then(res=>{
        console.log("mainpage",this.data.mainPage)
      })

      this.getDB()
  },
  onShow: function () {

  }
  
});
