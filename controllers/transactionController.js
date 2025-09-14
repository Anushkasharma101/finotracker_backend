import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

export const addTransaction = async (req, res) => {
  try {
    const { accountId, amount, type, category } = req.body;

    const transaction = new Transaction({
      userId: req.user.id,
      accountId,
      amount,
      type,
      category
    });

    await transaction.save();

    // update account balance
    const account = await Account.findById(accountId);
    if (!account) return res.status(404).json({ message: "Account not found" });

    if (type === "income") {
      account.balance += amount;
    } else if (type === "expense") {
      account.balance -= amount;
    }

    await account.save();

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id })
      .populate("accountId", "name") // fetch account name
      .sort({ date: -1 }); // latest first

    const formatted = transactions.map(t => ({
      id: t._id,
      amount: t.amount,
      category: t.category,
      type: t.type,
      account: t.accountId?.name || "Unknown",
      date: t.date.toLocaleDateString(),
      time: t.date.toLocaleTimeString()
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

