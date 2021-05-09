"use strict";
const _ = require("lodash");
/*
1 /api/v1/users/
2 /api/v1/users/?fields=age
*/
exports.index = async function () {
  const result = await this.service.user.list();
  console.log("index");
  this.body = result;
};

// exports.createRule = {
//   name: 'string',
//   password: 'string',
// };
exports.create = async function () {
  const user = this.params.data;
  console.log("create", user);
  const newUser = await this.service.user.create(user);
  this.data = {
    data: newUser,
    message: "注册成功",
  };
};

exports.update = async function () {
  const user = this.params.data;
  const newUser = await this.service.user.update(user, this.params.id);
  this.data = newUser;
};

exports.destroy = async function () {};
