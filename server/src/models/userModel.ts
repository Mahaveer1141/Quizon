import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
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

const User = mongoose.model("users", userSchema);

export default User;
