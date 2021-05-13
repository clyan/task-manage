"use strict";
const _ = require("lodash");

// exports.createRule = {
//   name: 'string',
//   password: 'string',
// };

// 注册接口
exports.create = async function () {
  const user = this.params.data;
  // 查询用户是否存在
  const users = await this.service.user.findByName(user.username);
  if (users.length > 0) {
    this.data = {
      statu: 400,
      message: `用户${users[0].username}已存在`,
    };
    return;
  }
  // {"user":{"id":193427603,"name":"vvv","token":"MTkzNDI3NjAz"}}
  // 创建
  const userInfo = await this.service.user.create(user);
  if (!userInfo) {
    this.data = {
      statu: 400,
      message: "用户失败",
    };
    return;
  }
  console.log(userInfo);
  const token = await this.service.auth.apply(user[0]._id, user[0].username);
  this.data = {
    user: {
      id: userInfo._id,
      name: userInfo.username,
      token,
    },
  };
  return;
};

exports.destroy = async function () {};
