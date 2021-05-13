"use strict";
const _ = require("lodash");

// exports.createRule = {
//   name: 'string',
//   password: 'string',
// };

// 登录接口
exports.create = async function () {
  const user = this.params.data;
  const { service } = this;

  // 调用 Service 进行业务处理
  const userInfo = await service.auth.login(user);
  if (Object.keys(userInfo).length <= 0) {
    this.data = {
      status: 400,
      message: "用户名或密码不正确",
    };
  }
  const token = await this.service.auth.apply(userInfo._id, userInfo.username);
  if (token) {
    this.cookies.set("userToken", token, {
      httpOnly: true,
      sameSite: true,
      encrypt: true,
      maxAge: 1000 * 3600 * 24,
    });
    // 设置响应内容和响应状态码
    this.data = {
      user: {
        id: userInfo._id,
        name: userInfo.username,
        token,
      },
    };
  }
};
