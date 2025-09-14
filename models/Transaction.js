import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account", required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., Home, Beauty, Car
  type: { type: String, enum: ["income", "expense"], required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("Transaction", transactionSchema);
