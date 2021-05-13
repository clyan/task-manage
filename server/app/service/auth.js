"use strict";
const Service = require("egg").Service;

class AuthService extends Service {
  async apply(id, username) {
    const { ctx } = this;
    return ctx.app.jwt.sign(
      {
        data: {
          id,
          username,
        },
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      },
      ctx.app.config.jwt.secret
    );
  }
  async register(info) {
    const { service } = this.ctx;
    // 查询用户是否存在
    const users = await service.user.findByName(info.name);
    if (users.length) {
      return false;
    }

    // 创建
    const userInfo = service.user.create(info);
    console.log(userInfo);
    return userInfo;
  }
  async login(payload) {
    const { service } = this.ctx;
    const { user: UserService } = service;
    // 查询用户是否存在
    const user = await UserService.findByNameAndPwd({
      username: payload.username,
      password: payload.password,
    });
    return user[0];
  }
}

module.exports = AuthService;
