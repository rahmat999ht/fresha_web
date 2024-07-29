import { Hono } from "hono";

import * as custamerService from "../../../../services/customer.service";
import { authMiddleware } from "../auth/auth.middelware";
import logger from "~/utils/logger";
import { HttpStatus } from "~/utils/http_status";
import { customerSchema } from "~/type/customer";
import { queryPageSchema } from "~/utils/pagination";
import { zValidator } from "@hono/zod-validator";

const custamerRouter = new Hono();

/**
 * Middleware to check if data is cached in Redis
 * If cached data exists, return it
 * Otherwise call next() to continue request processing
 */

custamerRouter.use("*", authMiddleware);
// custamerRouter.use("*", cacheMiddleware);

custamerRouter.get("/", async (c) => {
  const query = c.req.query();

  const { id } = query;

  if (id) {
    const customer = await custamerService.getCustomer(id);
    return c.json({
      code: HttpStatus.OK,
      status: "Response ID Ok",
      data: customer,
    });
  }

  const queryPage = queryPageSchema.parse(query);
  const custamers = await custamerService.getsCustomer(queryPage);
  logger.debug(custamers);

  return c.json({
    code: HttpStatus.OK,
    status: "Response List Ok",
    ...custamers,
  });
});

custamerRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const custamer = await custamerService.getCustomer(id);

  logger.debug(custamer);

  return c.json({
    code: HttpStatus.OK,
    status: "Response Id Ok",
    data: custamer,
  });
});

custamerRouter.patch("/", zValidator("json", customerSchema), async (c) => {
  const body = c.req.valid("json");

  const val = customerSchema.safeParse(body);
  if (!val.success) return c.text("Invalid!", 500);

  const customer = await custamerService.custamerUpdate({
    id: body.id,
    name: body.name,
    image: body.image,
    address: body.address,
    phone: body.phone,
  });
  logger.debug(customer);

  return c.json({
    code: HttpStatus.OK,
    status: "Response Update Ok",
    data: customer,
  });
});

export default custamerRouter;
