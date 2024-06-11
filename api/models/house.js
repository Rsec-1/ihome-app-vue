const mongoose = require("mongoose");
const { Schema } = mongoose;

const houseSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  address: { type: String },
  rooms: [{ type: mongoose.Types.ObjectId, ref: "Room" }],
  createdAt: { type: Date, default: Date.now },
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
