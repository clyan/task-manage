"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  validate: {
    enable: true,
    package: "egg-validate",
  },
  bcrypt: {
    enable: true,
    package: "egg-bcrypt",
  },
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
  redis: {
    enable: true,
    package: "egg-redis",
  },
  rest: {
    enable: true,
    package: "egg-rest",
  },
  // had enabled by egg
  // static: {
  //   enable: true,
  // }
  // passport: {
  //   enable: true,
  //   package: 'egg-passport',
  // },
  // passportGithub: {
  //   enable: true,
  //   package: 'egg-passport-github',
  // },
  // passportLocal: {
  //   enable: true,
  //   package: 'egg-passport-local',
  // },
  // routerPlus: {
  //   enable: true,
  //   package: 'egg-router-plus',
  // },
};
