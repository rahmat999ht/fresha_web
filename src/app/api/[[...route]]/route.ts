import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import productRouter from "./product";
import orderRouter from "./order";
import authRouter from "./auth";
import custamerRouter from "./customer";
import hastagMlRouter from "./hastag_ml";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

app.onError((err, c) => {
  const { message } = err;
  console.log("error");
  // discovered errors
  if (err instanceof HTTPException) {
    console.debug({ error: message });
    // Get the custom response
    return c.json(
      {
        code: err.status,
        errors: [message],
      },
      err.status,
    );
  }
  // unnoticed error
  console.error({ error: err });
  return c.json(
    {
      code: 501,
      status: "Server Error",
      errors: [message],
    },
    501,
  );
});

app.route("/order", orderRouter);
app.route("/product", productRouter);
app.route("/auth-custamer", authRouter);
app.route("/custamer", custamerRouter);
app.route("/hastag-ml", hastagMlRouter);

export const GET = handle(app);
export const PUT = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
