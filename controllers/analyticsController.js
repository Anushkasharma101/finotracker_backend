import Transaction from "../models/Transaction.js";
import Budget from "../models/Budget.js";
import Goal from "../models/Goal.js";


export const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await Transaction.find({ userId });

    const totalIncome = transactions
      .filter(t => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const totalExpenses = transactions
      .filter(t => t.type === "expense")
      .reduce((acc, t) => acc + t.amount, 0);

    res.json({
      balance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getCategoryExpenses = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $match: { userId: req.user._id, type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } }
    ]);

    res.json(data.map(d => ({ category: d._id, total: d.total })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getMonthlyTrends = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $match: { userId: req.user._id } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] }
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] }
          }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(
      data.map(d => ({
        month: `${d._id.month}-${d._id.year}`,
        income: d.income,
        expense: d.expense
      }))
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getBudgetComparison = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id });

    const expenses = await Transaction.aggregate([
      { $match: { userId: req.user._id, type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);

    const result = budgets.map(b => {
      const spent = expenses.find(e => e._id === b.category)?.total || 0;
      return {
        category: b.category,
        limit: b.limit,
        spent,
        remaining: b.limit - spent
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getGoalsProgress = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });

    const today = new Date();

    const result = goals.map(g => {
      const saved = g.savedAmount;
      const remaining = g.targetAmount - saved;

      let monthsLeft = null;
      if (g.deadline) {
        const deadline = new Date(g.deadline);
        monthsLeft =
          (deadline.getFullYear() - today.getFullYear()) * 12 +
          (deadline.getMonth() - today.getMonth());
      }

      const monthlyContributionNeeded =
        monthsLeft && monthsLeft > 0 ? Math.ceil(remaining / monthsLeft) : remaining;

      return {
        title: g.title,
        targetAmount: g.targetAmount,
        savedAmount: saved,
        progress: Math.min((saved / g.targetAmount) * 100, 100),
        remaining,
        monthsLeft,
        monthlyContributionNeeded
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getTopExpenses = async (req, res) => {
  try {
    const data = await Transaction.aggregate([
      { $match: { userId: req.user._id, type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } },
      { $sort: { total: -1 } },
      { $limit: 5 } // top 5 expenses
    ]);

    res.json(data.map(d => ({ category: d._id, total: d.total })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMonthlyBudgetStatus = async (req, res) => {
  try {
    const userId = req.user._id;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const budgets = await Budget.find({ userId });

    const expenses = await Transaction.aggregate([
      {
        $match: {
          userId,
          type: "expense",
          date: { $gte: startOfMonth, $lt: endOfMonth }
        }
      },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);

    const result = budgets.map(b => {
      const spent = expenses.find(e => e._id === b.category)?.total || 0;
      const percentUsed = ((spent / b.limit) * 100).toFixed(2);

      return {
        category: b.category,
        limit: b.limit,
        spent,
        remaining: b.limit - spent,
        percentUsed
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
