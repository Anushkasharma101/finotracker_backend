import express from "express";
import { addAccount, getAccounts } from "../controllers/accountController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addAccount);
router.get("/", authMiddleware, getAccounts);

export default router;
