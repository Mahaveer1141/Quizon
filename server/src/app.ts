import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.json({ hello: "hello" });
});

export default app;
