import { Hono } from "hono";
import { queryPageSchema } from "~/utils/pagination";

import * as hastagService from "../../../../services/hastag_ml.service";
import { authMiddleware } from "../auth/auth.middelware";
import logger from "~/utils/logger";
import { HttpStatus } from "~/utils/http_status";
import { InputCreateHastagMl } from "~/repository/hastag_ml";

const hastagMlRouter = new Hono();

/**
 * Middleware to check if data is cached in Redis
 * If cached data exists, return it
 * Otherwise call next() to continue request processing
 */

hastagMlRouter.use("*", authMiddleware);
// hastagMlRouter.use("*", cacheMiddleware);

hastagMlRouter.get("/", async (c) => {
  const query = c.req.query();

  const { id } = query;
  if (id) {
    const hastagMl = await hastagService.getHastagMl(id);
    logger.debug(hastagMl);
    return c.json({
      code: HttpStatus.OK,
      status: "Ok",
      data: hastagMl,
    });
  }

  const queryPage = queryPageSchema.parse(query);
  const hastagMls = await hastagService.getsHastagMl(queryPage);

  return c.json({
    code: HttpStatus.OK,
    status: "Ok",
    ...hastagMls,
  });
});

hastagMlRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const hastagMl = await hastagService.getHastagMl(id);

  logger.debug(hastagMl);

  return c.json({
    code: HttpStatus.OK,
    status: "Ok",
    data: hastagMl,
  });
});

hastagMlRouter.post("/", async (c) => {
  const data: InputCreateHastagMl = await c.req.json();
  const hastagMl = await hastagService.createHastagSer(data);

  logger.debug(hastagMl);

  return c.json({
    code: HttpStatus.OK,
    status: "Ok",
    data: hastagMl,
  });
});

export default hastagMlRouter;
