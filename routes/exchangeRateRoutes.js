import express from "express";
import { getExchangeRates, updateExchangeRate } from "../controllers/exchangeRateController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getExchangeRates);
router.post("/", authMiddleware, updateExchangeRate); // if you want admin updates

export default router;
