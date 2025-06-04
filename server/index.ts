import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";

import type { Context } from "./context";
import { createSession, validateSessionToken } from "./lib/session";

const app = new Hono<Context>();

app.use("*", cors(), async (c, next) => {
  const sessionId = await validateSessionToken(c.req.header("Cookie") ?? "");

  if (!sessionId) {
    c.set("user", null);
    c.set("session", null);
    c.header("Set-Cookie", "session=");
    return next();
  }

  const { user, session } = sessionId;

  if (session && session.expiresAt < new Date()) {
    c.header("Set-Cookie", "session=");
  } else {
    c.header("Set-Cookie", `session=${session?.id}`);
  }

  c.set("session", session);
  c.set("user", user);
  return next();
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    const errResponse =
      err.res ??
      c.json(
        {
          success: false,
          error: err.message,
          isFormError:
            err.cause && typeof err.cause === "object" && "form" in err.cause
              ? err.cause.form === true
              : false,
        },
        err.status,
      );
    return errResponse;
  }

  return c.json(
    {
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Interal Server Error"
          : (err.stack ?? err.message),
    },
    500,
  );
});

export default app;
