import { indexMock } from '../../utils/indexMock.js';

const app = getApp();

Page({
  data: {
    mainPage:{},
    url:"https://www.easy-mock.com/mock/5bda9d1a58caf84108172bab/study163/mainPage",
    ads: [{
      "image": "https://7975-yuanx1998-1257892943.tcb.qcloud.la/ads/1.jpg?sign=3c799c02741459a45d1b11ddf8e87023&t=1543071668"
    },
    {
      "image": "https://7975-yuanx1998-1257892943.tcb.qcloud.la/ads/2.jpg?sign=9f0fe6c27c1e798205fedd00b2ecd54c&t=1543071712"
    },
    {
      "image": "https://7975-yuanx1998-1257892943.tcb.qcloud.la/ads/3.jpg?sign=08729ff3a94e5178c67fb87b54ce22c5&t=1543071727"
    },
    {
      "image": "https://7975-yuanx1998-1257892943.tcb.qcloud.la/ads/4.jpg?sign=d235021dca761c000008970001f7fae1&t=1543071777"
    },
    {
      "image": "https://7975-yuanx1998-1257892943.tcb.qcloud.la/ads/5.jpg?sign=3b2c9299cc6a95fb4e296c66b38da7f6&t=1543071793"
    },
    {
      "image": "https://7975-yuanx1998-1257892943.tcb.qcloud.la/ads/6.jpg?sign=d7f4baed35e1771f465a0491ce2f6af9&t=1543071808"
    },
    {
      "image": "https://7975-yuanx1998-1257892943.tcb.qcloud.la/ads/7.jpg?sign=2b17d97ff2ef6a21d6f01e0d1847cd8b&t=1543071821"
    }
  ]
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
  },
  onShow: function () {

  }
  
});
