// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const course_videoList = db.collection('course_videoList');

// 云函数入口函数
exports.main = async (event, context) => {
  let videoList = course_videoList.where({ id: event.id }).get();
  return videoList
}