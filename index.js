const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
  res.json({ hello: "hello" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
