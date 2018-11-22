wx.cloud.init() 
const db = wx.cloud.database();
const course_info = db.collection('course_info');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: {},
    id:"c1",
    yuanx_text:[],
    text:`<span>七大经典通识领域精华领读&nbsp;&nbsp;&nbsp;这门课程帮助你从阅读中理解世界。<br><br>＞＞＞如果你不知道想读一点经典的书应该读什么？
          <br>——这门课程可以告诉你，它是一门七大经典通识领域阅读指南，从不知道到知道经典领域的通知知识，帮助你建立通识阅读框架
          <br><br>＞＞＞如果你不知道遇到喜欢的领域应该怎么读？
          <br>——在这里，从不爱读不会读到培养阅读兴趣、，这是从0开始的自我通识阅读课。<br><br>＞＞＞如果你疑惑读了很多书会有什么用？
          <br>——罗文益用通识阅读的经历告诉你，最有价值的阅读是帮助你多元化视角看待世界，通过多领域阅读带来不一样的解决问题和思维方式！<br><br>【课程内容包括】
          <br>&nbsp;·&nbsp;25堂精品视频课&nbsp;永久观看&nbsp;不限次数；
          <br>&nbsp;·&nbsp;7大经典领域模块导读：经济学、社会学、心理学、政治学、金融学、哲学和数学；
          <br>·&nbsp;88本落地书单推荐：不只是列列书名，而是告诉你一个可操作的阅读路径；
          <br>·&nbsp;包括书单和阅读建议以及N+关于如何看待世界角度的思维；<br><br>【学习指南】<br>1.课程内容：课程全部视频已发布上线，共25节；<br>2.有效期：课程一次购买，视频永久有效，可自行安排学习，不限时间次数；
          <br>3.欢迎在讨论区和评论区留言互动，也可以关注罗文益老师公众号「罗文益」（ID：wenyidehua）进行互动</span>`
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let text = this.data.text;
    text = text.replace(/<\/?span>/g, "").replace(/&nbsp;/g, " ")
    let yuanx_text = text.split("<br>");
    console.log(yuanx_text);
    console.log(typeof text)
    this.setData({
      yuanx_text
    })
  },

 
})