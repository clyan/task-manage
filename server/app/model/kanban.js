"use strict";
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const KanbanSchema = new Schema(
    {
      id: { type: Number },
      name: { type: String },
      projectId: { type: Number },
    },
    {
      minimize: true,
    }
  );
  return mongoose.model("Kanban", KanbanSchema);
};
