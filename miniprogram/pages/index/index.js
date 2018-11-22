const app = getApp();

Page({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    // sellWell: [],
    // special: [],
    mainPage:{},
    test:{},
    title:[{
      "text":"畅销好课",
      "index":0
    },{
      "text":"专题",
      "index":1
    },{
      "text":"办公效率",
      "index":2
    },{
      "text":"职场发展",
      "index":3
    },{
      "text":"语言留学",
      "index":4
    },{
      "text":"金融财会",
      "index":5
    },{
      "text":"职业之外",
      "index":6
    },],
    ads:
    [
      {
        "image": "../../images/ads/1.jpg"
      },
      {
        "image": "../../images/ads/2.jpg"
      },
      {
        "image": "../../images/ads/3.jpg"
      },
      {
        "image": "https://edu-image.nosdn.127.net/e62efdae-0ba9-48bd-8cf7-ce521fcd2fb7.jpg?imageView&amp;crop=0_0_1242_573&amp;quality=100&amp;thumbnail=750y346&amp;type=webp"
      },
      {
        "image": "https://edu-image.nosdn.127.net/c176d36b-e75f-4862-97a5-3f38a7a7ab9f.jpg?imageView&amp;crop=0_0_1242_573&amp;quality=100&amp;thumbnail=750y346&amp;type=webp"
      },
      {
        "image": "https://edu-image.nosdn.127.net/beccf78b-6b92-4303-88d5-613b0e41395e.jpg?imageView&amp;crop=0_0_1242_573&amp;quality=100&amp;thumbnail=750y346&amp;type=webp"
      },
      {
        "image": "https://edu-image.nosdn.127.net/809624c7-db3f-4f4d-bc9b-85a3e8835279.jpg?imageView&amp;crop=0_0_1242_573&amp;quality=100&amp;thumbnail=750y346&amp;type=webp"
      }
    ]
  },

  onLoad() {

    wx.request({
      url: 'https://www.easy-mock.com/mock/5bda9d1a58caf84108172bab/study163/mainPage',
      success:(res) => {
        console.log("---easy-mock.data---")
        console.log(res.data)

         this.setData({
           mainPage : res.data
         })


 
      },
      error:(err) => {
        console.log(err);
      }
    })

  },
  onShow: function () {

  }
  
});
