import express from "express";
import {
  getQuizById,
  getMyQuizs,
  createQuiz,
} from "../controllers/quizController";

const router = express();

router.get("/:id", getQuizById);
router.get("/my_quiz", getMyQuizs);
router.post("/create_quiz", createQuiz);

export default router;
