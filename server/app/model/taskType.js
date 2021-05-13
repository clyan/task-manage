"use strict";
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TaskTypeSchema = new Schema(
    {
      id: { type: Number },
      name: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
    {
      minimize: true,
    }
  );
  return mongoose.model("TaskType", TaskTypeSchema);
};
