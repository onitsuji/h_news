import { Hono } from "hono";

import type { Context } from "@/context";
import { zValidator } from "@hono/zod-validator";

export const authRouter = new Hono<Context>().post(
  "/signup",
  zValidator(),
  async (c) => {},
);
