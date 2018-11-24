// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();
const course_cart = db.collection('course_cart');

// 云函数入口函数
exports.main = async (event, context) => {
  let info = course_cart.where({ id: event.id }).get();
  return info
}