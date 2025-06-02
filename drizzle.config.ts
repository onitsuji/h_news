import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // What SQL DBMS are we using
  dialect: "postgresql",
  // Where will our schemas be located
  schema: "server/db/schemas/*",
  // Credentials to access db
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
