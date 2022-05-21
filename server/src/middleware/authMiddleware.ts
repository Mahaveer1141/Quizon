import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { MyRequest } from "../types";

export function authenticateToken(
  req: MyRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) res.json({ err: "Not allowed" });

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || "",
    (err: any, user: any) => {
      console.log(err);
      if (err) res.sendStatus(403).json({ msg: "Not valid" });
      req.userId = user;
      next();
    }
  );
}
