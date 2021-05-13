"use strict";
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  const config = {};
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1620314879792_3003";
  // add your middleware config here
  config.middleware = ["errorHandler", "auth"];
  // 免验证
  config.routerAuth = ["/", "/api/v1/login", "/api/v1/register"];
  // add your user config here
  const userConfig = {
    // passportGithub: {
    //   key: process.env.EGG_PASSPORT_GITHUB_CLIENT_ID || 'test',
    //   secret: process.env.EGG_PASSPORT_GITHUB_CLIENT_SECRET || 'test',
    // },
    // passportLocal: {
    //   usernameField: 'name',
    //   passwordField: 'pass',
    // },
    mongoose: {
      url: "mongodb://127.0.0.1/taskmanage",
      options: {
        server: { poolSize: 20 },
        useNewUrlParser: true,
      },
    }, // database
    // redis: {
    //   client: {
    //     host: process.env.EGG_REDIS_HOST || '127.0.0.1',
    //     port: process.env.EGG_REDIS_PORT || 6379,
    //     password: process.env.EGG_REDIS_PASSWORD || '',
    //     db: process.env.EGG_REDIS_DB || '0',
    //   },
    // },
    // cors配置
    security: {
      csrf: {
        enable: false,
        credentials: true,
      },
      domainWhiteList: [
        "http://localhost:7001",
        "http://192.168.18.2:3001",
        "http://192.168.56.1:7001/",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:3000",
        "http://localhost:3000",
      ],
      xframe: {
        ignore: "/api/v1/",
      },
    },
    cors: {
      credentials: true,
      origin: "*",
      allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    //   jwt 配置文件
    jwt: {
      secret: "Great4-M",
      enable: false, // default is false
      match: "/jwt", // optional
    },
    rest: {
      urlprefix: "/api/v1/", // Prefix of rest api url. Default to /api/
      authRequest: null,
      authIgnores: null,
    },
  };
  return {
    ...config,
    ...userConfig,
  };
};
