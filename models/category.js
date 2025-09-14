import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  limit: { type: Number, default: 0 }, 
  spent: { type: Number, default: 0 },
  left: { type: Number, default: function () { return this.limit; } },
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
