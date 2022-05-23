import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { MyRequest } from "../types";

export function authenticateToken(
  req: MyRequest,
  _res: Response,
  next: NextFunction
) {
  try {
    const authHeader = req.headers["authorization"];
    const token = (authHeader && authHeader.split(" ")[1]) || "";
    if (token == null) throw new Error("Token not found in headers");

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || "",
      (err: any, user: any) => {
        if (err) throw new Error(err.message);
        req.userId = user.userId;
      }
    );
  } catch (err) {
    next(err);
  }
}
