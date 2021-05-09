"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "任务管理系统---接口管理平台";
  }
}

module.exports = HomeController;
