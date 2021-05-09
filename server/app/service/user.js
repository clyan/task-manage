"use strict";
const Service = require("egg").Service;

class UserService extends Service {
  async list() {
    return this.ctx.model.User.find();
  }
  create(resUser) {
    const user = new this.ctx.model.User();
    user.name = resUser.name;
    user.password = resUser.password;
    return user.save();
  }
}

module.exports = UserService;
