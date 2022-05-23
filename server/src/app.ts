import express from "express";
import cors from "cors";
import "dotenv/config";

import databaseConfig from "./config/databaseConfig";
import { errorHandler, notFound } from "./middleware/errorHandler";
import authRoute from "./routes/authRoute";
import quizRoute from "./routes/quizRoutes";

const app = express();

databaseConfig();

app.use(express.json());
app.use(cors());

app.use("/auth", authRoute);
app.use("/quizs", quizRoute);

app.get("/", (_req, res) => {
  res.json({ hello: "hello" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
