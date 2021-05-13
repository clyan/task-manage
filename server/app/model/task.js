"use strict";
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const TaskSchema = new Schema(
    {
      id: { type: Number },
      name: { type: String },
      processorId: { type: Number },
      projectId: { type: Number },
      epicId: { type: Number },
      kanbanId: { type: Number },
      typeId: { type: Number },
      note: { type: String },
      createdAt: { type: Date, default: Date.now },
    },
    {
      minimize: true,
    }
  );
  return mongoose.model("Task", TaskSchema);
};
