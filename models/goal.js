import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  finishDate: { type: Date, required: true },
  collectedAmount: { type: Number, default: 0 },
  goalAmount: { type: Number, required: true },
  percentCompleted: { type: Number, default: 0 }, // (collectedAmount/goalAmount)*100
}, { timestamps: true });

export default mongoose.model("Goal", goalSchema);
