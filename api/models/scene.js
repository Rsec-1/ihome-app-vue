const mongoose = require("mongoose");
const { Schema } = mongoose;

const sceneSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  conditions: [
    {
      type: { type: String, required: true },
      params: { type: Schema.Types.Mixed, required: true },
    },
  ],
  actions: [
    {
      deviceId: {
        type: mongoose.Types.ObjectId,
        ref: "Device",
        required: true,
      },
      command: { type: String, required: true },
      params: { type: Schema.Types.Mixed },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Scene = mongoose.model("Scene", sceneSchema);

module.exports = Scene;
