import mongoose from "mongoose";

const exchangeRateSchema = new mongoose.Schema({
  currency: String,
  buy: Number,
  sell: Number,
  change: Number,
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("ExchangeRate", exchangeRateSchema);
