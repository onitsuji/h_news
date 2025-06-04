import { z } from "zod";

export type Result<T, E extends Error> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: E;
    };

export const loginSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-zA-Z0-9_]+$/),
});
