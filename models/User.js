const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, unique: true }, // optional but unique
  profileImage: { type: String, default: "" }, // image URL or base64 string
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
