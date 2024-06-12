const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema({
  houseId: { type: mongoose.Types.ObjectId, ref: "House", required: true },
  name: { type: String, required: true },
  devices: [{ type: mongoose.Types.ObjectId, ref: "Device" }],
  createdAt: { type: Date, default: Date.now },
});

const Room = mongoose.model("Room", roomSchema);

module.exports = Room;
