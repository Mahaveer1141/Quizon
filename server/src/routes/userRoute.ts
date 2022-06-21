import express from "express";
import { me } from "../controllers/userController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/me", authenticateToken, me);

export default router;
