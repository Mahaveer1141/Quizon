import jwt from "jsonwebtoken";

export function generateAccessToken(user: any) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: "15s",
  });
}
