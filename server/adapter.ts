import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";
import { z } from "zod";

import { sessionTable, userTable } from "./db/schemas/auth";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

// Typesafe env variables, process.env returns an object that zod parses
const processEnv = EnvSchema.parse(process.env);

const queryClient = postgres(processEnv.DATABASE_URL);
export const db = drizzle(queryClient, {
  schema: {
    user: userTable,
    sessions: sessionTable,
  },
});
