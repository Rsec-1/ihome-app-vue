const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  email: {
    type: String,
    match: [/.+\@.+\..+/, "Please enter a valid email address"],
  },
  nickname: {
    type: String,
    default: () => `User${Math.floor(Math.random() * 10000)}`,
  },
  houses: [{ type: mongoose.Schema.Types.ObjectId, ref: "House" }],
  role: { type: String, enum: ["user", "admin"], default: "user" },
  createdAt: { type: Date, default: Date.now },
  resetToken: String,
  resetTokenExpiration: Date,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
