// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const my_courses = db.collection('my_courses');

// 云函数入口函数
exports.main = async (event, context) => {
  let info = my_courses.get();
  return info
}