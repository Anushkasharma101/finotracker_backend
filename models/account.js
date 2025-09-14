import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["cash", "payment_card", "online_card", "savings", "investment"], required: true },
  bankName: String,
  cardNumber: String,
  balance: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Account", accountSchema);
