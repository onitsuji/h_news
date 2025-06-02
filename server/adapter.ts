import { drizzle } from "drizzle-orm/postgres-js";

import postgres from "postgres";
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
});

// Typesafe env variables, process.env returns an object that zod parses
const processEnv = EnvSchema.parse(process.env);

const queryClient = postgres(processEnv.DATABASE_URL);
const db = drizzle(queryClient);
const result = await db.execute("select 1");
console.log(result);
