"use strict";
module.exports = (app) => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ProjectSchema = new Schema(
    {
      id: { type: Number },
      name: { type: String },
      personId: { type: Number },
      pin: { type: Boolean },
      organization: { type: String },
      created: { type: Number },
    },
    {
      minimize: true,
    }
  );
  return mongoose.model("Project", ProjectSchema);
};
