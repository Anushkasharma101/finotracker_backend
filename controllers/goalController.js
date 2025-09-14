import Goal from "../models/Goal.js";

export const addGoal = async (req, res) => {
  try {
    const goal = new Goal({ ...req.body, userId: req.user.id });
    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
