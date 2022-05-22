import { Response, NextFunction, Request } from "express";
import User from "../models/userModel";

export function getQuizById(req: Request, res: Response, next: NextFunction) {
  let id = req.params.id;
  User.find()
    .then((users) => {
      for (let i = 0; i < users.length; i++) {
        let b = users[i].Quizs;
        for (let j = 0; j < users[i].Quizs.length; j++) {
          if (b[j].id === id) {
            console.log(b[j]);
            res.json(b[j]);
          }
        }
      }
      res.json({ err: "key is not valid" });
    })
    .catch((err) => console.log(err));

  next();
}

export function getMyQuiz(req: Request, res: Response, next: NextFunction) {
  User.findOne({ username: req.userId })
    .then((users) => {
      res.json(users.Quizs);
    })
    .catch((err) => console.log(err));
  next();
}

export function createQuiz(req: Request, res: Response, next: NextFunction) {
  let quiz_list = req.body;
  if (quiz_list.info !== undefined) {
    console.log(quiz_list);
    let errors = [];
    if (quiz_list.time < 5) {
      errors.push("time must be more than 5 seconds.");
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
        errors.push("Enter all details correctly\n");
      }
    }
    if (errors.length > 0) {
      res.json({
        errors: errors,
      });
    }

    User.findOne({ username: req.userId })
      .then((user) => {
        user.Quizs.push(quiz_list);
        user
          .save()
          .then((user: any) => {
            res.json(user);
          })
          .catch((err: any) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
  next();
}
