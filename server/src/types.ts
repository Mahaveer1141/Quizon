import { Request } from "express";

export type MyRequest = Request & { userId: string };
