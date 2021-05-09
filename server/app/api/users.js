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

/*
/api/v1/users/1
/api/v1/users/1,2
/api/v1/users/1?fields=age
*/
exports.show = async function () {
  const fields = this.query.fields
    ? [...this.query.fields.split(","), "id"]
    : null;
  console.log("show");
  if (this.params.ids.length > 1) {
    const users = await this.service.user.getUsersByIds(this.params.ids);

    this.data = users.map((user) => {
      return fields ? _.pick(user, fields) : user;
    });

    return;
  }

  const user = await this.service.user.getUserById(this.params.id);

  this.data = fields ? _.pick(user, fields) : user;
};

// exports.createRule = {
//   name: 'string',
//   password: 'string',
// };

exports.create = async function () {
  const user = this.params.data;
  console.log("create", user);
  const newUser = await this.service.user.create(user);
  this.data = newUser;
};
exports.update = async function () {
  const user = this.params.data;
  const newUser = await this.service.user.update(user, this.params.id);
  this.data = newUser;
};

exports.destroy = async function () {
  const count = await this.service.user.destroy(this.params.id);
  console.log("destroy", count);
  if (count === 1) {
    this.data = {
      success: true,
    };
    return;
  }

  this.status = 500;
  this.data = {
    success: false,
  };
};
