import Budget from "../models/Budget.js";
import Category from "../models/Category.js";
import Goal from "../models/Goal.js";

// ================== BUDGET ===================
export const addBudget = async (req, res) => {
  try {
    const { month, amount } = req.body;
    const dailyLimit = amount / 30; // approx

    const budget = await Budget.create({
      userId: req.user._id,
      month,
      amount,
      spent: 0,
      rest: amount,
      dailyLimit,
      percentSpent: 0,
    });

    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error adding budget", error });
  }
};

export const getBudget = async (req, res) => {
  try {
    const budget = await Budget.find({ userId: req.user._id });
    res.json(budget);
  } catch (error) {
    res.status(500).json({ message: "Error fetching budget", error });
  }
};

// ================== CATEGORY ===================
export const addCategory = async (req, res) => {
  try {
    const { name, limit } = req.body;

    const category = await Category.create({
      userId: req.user._id,
      name,
      limit,
      spent: 0,
      left: limit,
    });

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error adding category", error });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user._id });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

// ================== GOALS ===================
export const addGoal = async (req, res) => {
  try {
    const { name, finishDate, goalAmount } = req.body;

    const goal = await Goal.create({
      userId: req.user._id,
      name,
      finishDate,
      goalAmount,
      collectedAmount: 0,
      percentCompleted: 0,
    });

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: "Error adding goal", error });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const { collectedAmount } = req.body;

    const goal = await Goal.findById(id);
    if (!goal) return res.status(404).json({ message: "Goal not found" });

    goal.collectedAmount += collectedAmount;
    goal.percentCompleted = (goal.collectedAmount / goal.goalAmount) * 100;
    await goal.save();

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: "Error updating goal", error });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching goals", error });
  }
};
