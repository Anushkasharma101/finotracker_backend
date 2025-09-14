import express from "express";
import { addTransaction, getTransactions } from "../controllers/transactionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addTransaction);
router.get("/", authMiddleware, getTransactions);

export default router;
