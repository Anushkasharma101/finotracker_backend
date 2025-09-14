import express from "express";
import { addBudget, getBudgets } from "../controllers/budgetController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addBudget);
router.get("/", authMiddleware, getBudgets);

export default router;
