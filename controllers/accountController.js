import Account from "../models/account";

export const addAccount = async (req, res) => {
  try {
    const account = new Account({ ...req.body, userId: req.user.id });
    await account.save();
    res.status(201).json(account);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ userId: req.user.id });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
