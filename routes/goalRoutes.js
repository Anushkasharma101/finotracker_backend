import express from "express";
import { addGoal, getGoals } from "../controllers/goalController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addGoal);
router.get("/", authMiddleware, getGoals);

export default router;
