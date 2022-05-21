import User from "../models/userModel";
import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { MyRequest } from "../types";

export function register(req: MyRequest, res: Response, next: NextFunction) {
  let { username, password, confirmPass } = req.body;
  if (username && password) {
    username = username.trim();
    password = password.trim();
    let errors = [];
    if (!username || !password) {
      errors.push("Please enter all fields\n");
    }
    if (confirmPass != password) {
      errors.push("Password and Confirm Password doesn't match\n");
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters\n");
    }
    if (errors.length > 0) {
      res.json({ errors: errors });
    } else {
      User.findOne({ username: username })
        .then((user: any) => {
          if (user) {
            errors.push("Username already exists\n");
            res.json({ errors: errors });
          } else {
            const user = new User({
              username,
              password,
            });
            user
              .save()
              .then((user: any) => {
                res.json(user);
              })
              .catch((err: any) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }
  next();
}

export function login(req: MyRequest, res: Response, next: NextFunction) {
  let { username, password } = req.body;
  if (username && password) {
    username = username.trim();
    password = password.trim();
    let errors = [];
    if (!username || !password) {
      errors.push("Please enter all fields\n");
    }
    if (password.length < 8) {
      errors.push("Password must be at least 8 characters\n");
    }
    if (errors.length > 0) {
      res.json({ errors: errors });
    } else {
      User.findOne({ username: username })
        .then((user) => {
          if (!user) {
            errors.push("User don't exists\n");
            res.json({ errors: errors });
          } else {
            if (user.password != password) {
              errors.push("password is incorrect\n");
              res.json({ errors: errors });
            } else {
              const accessToken = jwt.sign(
                {
                  _id: user.id,
                  username: user.username,
                  password: user.password,
                  Quiz: user.Quiz,
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10d" }
              );
              req.userId = user;
              res.json({ user: user, accessToken: accessToken });
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }
  next();
}
