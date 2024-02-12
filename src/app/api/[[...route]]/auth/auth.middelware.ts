import type { Context, MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";

import { verifyJwt } from "~/services/jwt";
import { type Custamer } from "@prisma/client";
import logger from "~/utils/logger";

const authCheck = (c: Context) => {
  const authorization = c.req.header("Authorization");

  logger.info("here: " + authorization);

  if (!authorization) {
    throw new HTTPException(404, {
      message: "Anda Belum Login",
    });
  }

  const token = authorization.split(" ")[1];

  const jwtDecode = verifyJwt(token ?? "");

  if (!jwtDecode) {
    throw new HTTPException(403, {
      message: "User ini tidak ada",
    });
  }

  return jwtDecode;
};

export const authMiddleware: MiddlewareHandler<{
  Variables: { userData: Custamer };
}> = async (c, next) => {
  const jwt = authCheck(c) as Custamer;
  c.set("userData", jwt);

  return next();
};
