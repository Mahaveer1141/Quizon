import express from "express";
import {
  getQuizById,
  getMyQuiz,
  createQuiz,
} from "../controllers/quizController";

const router = express();

router.get("/:id", getQuizById);
router.get("/my_quiz", getMyQuiz);
router.post("/create_quiz", createQuiz);

export default router;
