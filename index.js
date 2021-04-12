const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database is connected succusefully");
});

const app = express();

app.use(require("body-parser").urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let currentUser = {};

var userSchema = new mongoose.Schema({
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
var User = mongoose.model("users", userSchema);

app.get("/", (req, res) => {
  res.json({ hello: "hello" });
});

app.get("/quiz/:id", (req, res) => {
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
});

app.get("/my_quiz", (req, res) => {
  User.findOne({ username: currentUser.username })
    .then((users) => {
      res.json(users.Quizs);
    })
    .catch((err) => console.log(err));
});

app.post("/register", (req, res) => {
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
        .then((user) => {
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
              .then((user) => {
                res.json(user);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }
});

app.post("/login", (req, res) => {
  // Authenticate User
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
              currentUser = user;
              res.json({ user: user, accessToken: accessToken });
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }
});

app.post("/create_quiz", authenticateToken, (req, res) => {
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

    User.findOne({ username: currentUser.username })
      .then((user) => {
        user.Quizs.push(quiz_list);
        user
          .save()
          .then((user) => {
            res.json(user);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.json({ err: "Not allowed" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403).json({ msg: "Not valid" });
    req.user = user;
    next();
  });
}
