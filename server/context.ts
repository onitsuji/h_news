import type { Env } from "hono";

import type { Session, User } from "./db/schemas/auth";

export interface Context extends Env {
  Variables: {
    user: User | null;
    session: Session | null;
  };
}
