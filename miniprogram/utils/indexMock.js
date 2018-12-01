let indexMock = function(url){    
      return new Promise((resolve,reject)=>{
          wx.request({
              url:url,
              success(res){
                  resolve(res.data)
              },
              fail(err){
                  reject(err)
              }
          })
      })
  
}


module.exports = {
    indexMock: indexMock
}