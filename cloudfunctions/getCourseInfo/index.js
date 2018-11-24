// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const course_info = db.collection('course_info');

// 云函数入口函数
exports.main = async (event, context) => {

  let info = course_info.where({ id: event.id }).get();
  return info
  
}