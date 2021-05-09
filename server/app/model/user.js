"use strict";
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema(
    {
      name: { type: String },
      password: { type: String },
    },
    {
      minimize: true,
    }
  );
  return mongoose.model("User", UserSchema);
};
