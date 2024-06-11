const mongoose = require("mongoose");
const { Schema } = mongoose;

const deviceSchema = new Schema({
  roomId: { type: mongoose.Types.ObjectId, ref: "Room", required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  icon: { type: String },
  status: { type: String, enum: ["online", "offline"], default: "offline" },
  location: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Device = mongoose.model("Device", deviceSchema);

module.exports = Device;
