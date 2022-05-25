import Joi from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  Quizs: [
    {
      time: Number,
      info: [
        {
          Question: String,
          optionA: String,
          optionB: String,
          optionC: String,
          optionD: String,
          correctAns: String,
          ress: String,
        },
      ],
    },
  ],
});

export const registerValidationSchema = Joi.object({
  username: Joi.string().trim().required().min(2).max(20),
  password: Joi.string().trim().required().min(8).max(16),
  confirmPassword: Joi.any()
    .equal(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

export const loginValidationSchmea = Joi.object({
  username: Joi.string().trim().required().min(2).max(20),
  password: Joi.string().trim().required().min(8).max(16),
});

const User = mongoose.model("users", userSchema);

export default User;
