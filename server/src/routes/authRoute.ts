import express from "express";
import { login, register, tokenChange } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/tokenChange", tokenChange);

export default router;
