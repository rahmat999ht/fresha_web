import { Hono } from "hono";

// import HttpStatus from "~/utils/http-utils";

import * as authService from "./auth.service";
import { authMiddleware } from "./auth.middelware";
// import { loginSchema, signInSchema } from "./auth.schema";
// import validatorSchemaMiddleware from "~/middlewares/validator";
// import { authMiddleware } from "~/middlewares/auth";

const authRouter = new Hono();

type Email = { email: string };

authRouter.post(
  "/login",
  //   validatorSchemaMiddleware("json", loginSchema),
  async (c) => {
    const loginProps: Email = await c.req.json();

    const { costumer, token } = await authService.login(loginProps);

    return c.json({
      code: 200,
      status: "Ok",
      data: {
        costumer,
        token,
      },
    });
  },
);

authRouter.post("/signin", async (c) => {
  const user: Email = await c.req.json();
  console.log(user);

  const newUser = await authService.signin(user);
  return c.json({
    code: 200,
    status: "Ok",
    data: newUser,
  });
});

authRouter.get("/my", authMiddleware, async (c) => {
  const {
    userData: { email, id },
  } = c.var;

  const user = await authService.currentUser({ id, email: email ?? "" });
  return c.json({
    code: 200,
    status: "Ok",
    data: user,
  });
});

export default authRouter;
