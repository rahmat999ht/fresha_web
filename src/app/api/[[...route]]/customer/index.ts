import { Hono } from "hono";

import * as custamerService from "../../../../services/customer.service";
import { authMiddleware } from "../auth/auth.middelware";
import logger from "~/utils/logger";
import { HttpStatus } from "~/utils/http_status";
import validatorSchemaMiddleware from "~/utils/validate_midleware";
import { custamerSchema, idCustamerSchema } from "~/type/customer";
import { queryPageSchema } from "~/utils/pagination";

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

  const queryPage = queryPageSchema.parse(query);
  const custamers = await custamerService.getsCustomer(queryPage);

  return c.json({
    code: HttpStatus.OK,
    status: "Ok",
    ...custamers,
  });
});

custamerRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const custamer = await custamerService.getCustomer(id);

  logger.debug(custamer);

  return c.json({
    code: HttpStatus.OK,
    status: "Ok",
    data: custamer,
  });
});

custamerRouter.put(
  "/:id",
  validatorSchemaMiddleware("json", custamerSchema),
  validatorSchemaMiddleware("param", idCustamerSchema),

  async (c) => {
    const userWithoutId = c.req.valid("json");
    const { id } = c.req.valid("param");
    const customer = await custamerService.updateCustamer({
      id: id,
      name: userWithoutId.name,
      image: userWithoutId.image,
      email: userWithoutId.email,
      address: userWithoutId.address,
      phone: userWithoutId.phone,
    });
    logger.debug(customer);

    return c.json({
      code: HttpStatus.OK,
      status: "Ok",
      data: customer,
    });
  },
);

export default custamerRouter;
