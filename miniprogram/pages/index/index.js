import { indexMock } from '../../utils/indexMock.js';

const app = getApp();

const db = wx.cloud.database();

Page({
  data: {
    mainPage:{},
    url:"https://www.easy-mock.com/mock/5bda9d1a58caf84108172bab/study163/mainPage",
    ads: [],
    icons: []
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
  onShow: function () {

  }
  
});
