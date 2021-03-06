import { Response, NextFunction, Request } from "express";

import { AppError } from "../utils/AppError";
import User from "../models/userModel";

export async function getQuizById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let { id } = req.params;
    const users = await User.find();
    for (let i = 0; i < users.length; i++) {
      let b = users[i].Quizs;
      for (let j = 0; j < users[i].Quizs.length; j++) {
        if (b[j].id === id) {
          console.log(b[j]);
          res.json(b[j]);
          return;
        }
      }
    }
    // for loop searches the quiz by id if not found
    // then we send the error message that
    // key is not valid
    throw new AppError("key is not valid", 200);
  } catch (err) {
    next(err);
  }
}

export async function getMyQuizs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await User.findOne({ _id: req.userId });
    res.json(user.Quizs);
  } catch (err) {
    next(err);
  }
}

export async function createQuiz(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let quiz_list = req.body;
    if (quiz_list.info !== undefined) {
      if (quiz_list.time < 5) {
        throw new AppError("time must be more than 5 seconds", 200);
      }
      for (let i = 0; i < quiz_list.info.length; i++) {
        if (
          quiz_list.info[i].Question.trim() === "" ||
          quiz_list.info[i].optionA.trim() === "" ||
          quiz_list.info[i].optionB.trim() === "" ||
          quiz_list.info[i].optionC.trim() === "" ||
          quiz_list.info[i].optionD.trim() === "" ||
          quiz_list.info[i].correctAns.trim() === ""
        ) {
          throw new AppError("Enter all details correctly", 200);
        }
      }
      const user = await User.findOne({ _id: req.userId });
      user.Quizs.push(quiz_list);
      user.save();
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
}
