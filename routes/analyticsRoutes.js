import express from "express";
import {
  getCategoryExpenses,
  getMonthlyTrends,
  getBudgetComparison,
  getTopExpenses,
  getGoalsProgress,
  getMonthlyBudgetStatus
} from "../controllers/analyticsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/categories", authMiddleware, getCategoryExpenses);
router.get("/monthly", authMiddleware, getMonthlyTrends);
router.get("/budgets", authMiddleware, getBudgetComparison);
router.get("/top-expenses", authMiddleware, getTopExpenses);
router.get("/goals-progress", authMiddleware, getGoalsProgress);
router.get("/monthly-budget", authMiddleware, getMonthlyBudgetStatus);


export default router;
