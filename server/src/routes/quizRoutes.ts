import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import {
  getQuizById,
  getMyQuizs,
  createQuiz,
} from "../controllers/quizController";

const router = express();

router.get("/quiz/:id", getQuizById);
router.get("/my_quiz", authenticateToken, getMyQuizs);
router.post("/create_quiz", authenticateToken, createQuiz);

export default router;
