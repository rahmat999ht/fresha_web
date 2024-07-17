import { Hono } from "hono";
import { queryPageSchema } from "~/utils/pagination";

import * as hastagService from "../../../../services/hastag_ml.service";
import { authMiddleware } from "../auth/auth.middelware";
import logger from "~/utils/logger";
import { HttpStatus } from "~/utils/http_status";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const postHastagMl = z.object({
  name: z.string().min(2, "nama harus di isi"),
  custamerId: z.string().min(1, "custamerId harus di isi"),
});

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
  const { id_cus } = query;
  if (id) {
    const hastagMl = await hastagService.getHastagMl(id);
    logger.debug(hastagMl);
    return c.json({
      code: HttpStatus.OK,
      status: "Get id hastag success",
      data: hastagMl,
    });
  }
  if (id_cus) {
    const hastagMl = await hastagService.getHastagWhereCustamer(id_cus);
    logger.debug(hastagMl);
    return c.json({
      code: HttpStatus.OK,
      status: "Get where id custamer success",
      data: hastagMl,
    });
  }

  const queryPage = queryPageSchema.parse(query);
  const hastagMls = await hastagService.getsHastagMl(queryPage);

  return c.json({
    code: HttpStatus.OK,
    status: "Get All Success",
    ...hastagMls,
  });
});

hastagMlRouter.get("/:id_cus", async (c) => {
  const { id_cus } = c.req.param();
  const hastagMl = await hastagService.getHastagWhereCustamer(id_cus);

  logger.debug(hastagMl);

  return c.json({
    code: HttpStatus.OK,
    status: "Get where id custamer success",
    data: hastagMl,
  });
});

hastagMlRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const hastagMl = await hastagService.getHastagMl(id);

  logger.debug(hastagMl);

  return c.json({
    code: HttpStatus.OK,
    status: "Get id hastag success",
    data: hastagMl,
  });
});

hastagMlRouter.post("/", zValidator("json", postHastagMl), async (c) => {
  const body = c.req.valid("json");

  const val = postHastagMl.safeParse(body);
  if (!val.success) return c.text("Invalid!", 500);

  const hastagMl = await hastagService.createHastagSer({
    name: body.name,
    custamerId: body.custamerId,
  });

  logger.debug(hastagMl);

  return c.json({
    code: HttpStatus.OK,
    status: "Post success Ok",
    data: hastagMl,
  });
});

export default hastagMlRouter;
