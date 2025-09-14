import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Personal budget
  month: { type: String, required: true }, // e.g., "2025-09"
  amount: { type: Number, required: true }, // total budget
  spent: { type: Number, default: 0 }, // calculated from transactions
  rest: { type: Number, default: function () { return this.amount; } },
  dailyLimit: { type: Number, default: 0 },
  percentSpent: { type: Number, default: 0 }, // (spent/amount)*100
}, { timestamps: true });

export default mongoose.model("Budget", budgetSchema);
