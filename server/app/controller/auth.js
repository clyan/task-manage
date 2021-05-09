"use strict";

const Controller = require("egg").Controller;

class AuthController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "任务管理系统---接口管理平台";
  }
  async login() {
    const { ctx } = this;
    ctx.body = "login";
  }
  async register() {
    const { ctx } = this;
    ctx.body = "register";
  }
}

module.exports = AuthController;
