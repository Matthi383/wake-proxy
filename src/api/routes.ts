// src/api/routes.ts
import { wakeRouter } from "./wake";
import { Router } from "express";

export const routes = Router();

routes.use("/wake", wakeRouter);