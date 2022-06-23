import User, {
  loginValidationSchmea,
  registerValidationSchema,
} from "../models/userModel";
import { Response, NextFunction, Request } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../utils/generateAccessToken";
import { ValidationError } from "joi";

const refreshTokens: string[] = [];

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    let userData = req.body;
    await registerValidationSchema.validateAsync(userData);
    const resUser = await User.findOne({ username: userData.username });
    if (resUser)
      throw new ValidationError("username already registered", null, null);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashedPassword;
    const user = new User(userData);
    const savedUser = await user.save();
    res.json({ id: savedUser._id });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const userData = req.body;
    await loginValidationSchmea.validateAsync(userData);
    const user = await User.findOne({ username: userData.username });
    if (!user)
      throw new ValidationError("username does not exists", null, null);
    const isCorrect: boolean = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!isCorrect) throw new ValidationError("Incorrect password", null, null);
    const accessToken = generateAccessToken({ userId: user._id });
    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.REFRESH_TOKEN_SECRET || ""
    );
    refreshTokens.push(refreshToken);
    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
}

export function tokenChange(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body;
    if (refreshToken == null) throw new Error("refreshToken not found");
    if (!refreshTokens.includes(refreshToken))
      throw new Error("Refresh Token expired");
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET || "",
      (err: any, user: any) => {
        if (err) throw new Error(err.message);
        const accessToken = generateAccessToken({ userId: user.userId });
        res.json({ accessToken });
      }
    );
  } catch (err) {
    next(err);
  }
}
