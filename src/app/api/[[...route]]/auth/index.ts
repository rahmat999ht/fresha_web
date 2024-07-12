import { Hono } from "hono";

import * as authService from "./auth.service";
import { authMiddleware } from "./auth.middelware";
import { HttpStatus } from "~/utils/http_status";

const authRouter = new Hono();

type Login = { email: string  };
type Register = { email: string,name: string  };

authRouter.post(
  "/login",
  async (c) => {
    const loginProps: Login = await c.req.json();

    const { costumer, token } = await authService.login(loginProps);

    return c.json({
      code: HttpStatus.OK,
      status: "Ok",
      data: {
        costumer,
        token,
      },
    });
  },
);

authRouter.post("/register", async (c) => {
  const user: Register = await c.req.json();
  console.log(user);

  const newUser = await authService.signin(user);
  return c.json({
    code: HttpStatus.OK,
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
    code: HttpStatus.OK,
    status: "Ok",
    data: user,
  });
});

export default authRouter;