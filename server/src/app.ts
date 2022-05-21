import express from "express";
import cors from "cors";
import "dotenv/config";

import databaseConfig from "./config/databaseConfig";
import { errorHandler, notFound } from "./middleware/errorHandler";

const app = express();

databaseConfig();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.json({ hello: "hello" });
});

app.use(notFound);
app.use(errorHandler);

export default app;
