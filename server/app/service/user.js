"use strict";
const Service = require("egg").Service;

class UserService extends Service {
  async list() {
    return this.ctx.model.User.find();
  }
  async create(userInfo) {
    const { User } = this.ctx.model;
    const result = await User.create({
      username: userInfo.username,
      password: userInfo.password,
    });
    return result;
  }
  async findByName(username) {
    const { User } = this.ctx.model;
    // 查询用户是否存在
    const users = await User.find({ username }, { password: 0 });
    return users;
  }
  async findByNameAndPwd({ username, password }) {
    const { User } = this.ctx.model;
    // 查询用户是否存在
    const users = await User.find({ username, password }, { password: 0 });
    return users;
  }
}

module.exports = UserService;
