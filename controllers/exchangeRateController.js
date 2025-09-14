import ExchangeRate from "../models/exchangeRate";

export const getExchangeRates = async (req, res) => {
  try {
    const rates = await ExchangeRate.find();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Optional: update exchange rates (admin use)
export const updateExchangeRate = async (req, res) => {
  try {
    const { currency, buy, sell, change } = req.body;

    let rate = await ExchangeRate.findOne({ currency });
    if (rate) {
      rate.buy = buy;
      rate.sell = sell;
      rate.change = change;
      rate.updatedAt = Date.now();
      await rate.save();
    } else {
      rate = new ExchangeRate({ currency, buy, sell, change });
      await rate.save();
    }

    res.json(rate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
