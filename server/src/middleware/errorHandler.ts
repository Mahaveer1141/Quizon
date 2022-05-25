import { Response, Request, NextFunction } from "express";
import { ValidationError } from "joi";

export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // check if error is validation error then set code to 200 else set to 500
  const statusCode =
    err instanceof ValidationError || res.statusCode !== 200
      ? res.statusCode
      : 500;
  res.status(statusCode);
  res.json({
    errors: {
      message: err.message,
    },
  });
}
