// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const course_comment = db.collection('course_comment');


// 云函数入口函数
exports.main = async (event, context) => {
  let comment = course_comment.where({ id: event.id }).get();
  return comment
}