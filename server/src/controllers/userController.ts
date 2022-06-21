import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

export async function me(req: Request, res: Response, next: NextFunction) {
  const { userId } = req;
  try {
    const userData = await User.findOne({ _id: userId }).select("username");
    res.json(userData);
  } catch (err) {
    next(err);
  }
}
