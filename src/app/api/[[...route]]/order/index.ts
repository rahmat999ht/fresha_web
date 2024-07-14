import { Hono } from "hono";
import { queryPageSchema } from "~/utils/pagination";

import * as orderService from "../../../../services/order.service";
import { authMiddleware } from "../auth/auth.middelware";
import logger from "~/utils/logger";
import { HttpStatus } from "~/utils/http_status";
import validatorSchemaMiddleware from "~/utils/validate_midleware";
import { orderCreateSchema } from "~/type/order";

const orderRouter = new Hono();

/**
 * Middleware to check if data is cached in Redis
 * If cached data exists, return it
 * Otherwise call next() to continue request processing
 */

orderRouter.use("*", authMiddleware);
// orderRouter.use("*", cacheMiddleware);

orderRouter.get("/", async (c) => {
  const query = c.req.query();

  const { id } = query;
  const { id_cus } = query;
  if (id) {
    const order = await orderService.getOrder(id);
    logger.debug(order);
    return c.json({
      code: HttpStatus.OK,
      status: "Ok",
      data: order,
    });
  }

  if (id_cus) {
    const order = await orderService.getOrderByCustamer(id_cus);
    logger.debug(order);
    return c.json({
      code: HttpStatus.OK,
      status: "Get all by id Custamer Success",
      data: order,
    });
  }

  const queryPage = queryPageSchema.parse(query);
  const orders = await orderService.getsOrder(queryPage);

  return c.json({
    code: HttpStatus.OK,
    status: "Get All Order Success",
    ...orders,
  });
});

orderRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const order = await orderService.getOrder(id);

  logger.debug(order);

  return c.json({
    code: HttpStatus.OK,
    status: "Get Order By Id Success",
    data: order,
  });
});

orderRouter.post(
  "/",
  validatorSchemaMiddleware("json", orderCreateSchema),
  async (c) => {
    const data = c.req.valid("json");
    const order = await orderService.createOrder(data);

    logger.debug(order);

    return c.json({
      code: HttpStatus.OK,
      status: "Berhasil Melakukan Order",
      data: order,
    });
  },
);

orderRouter.get("/:id_cus", async (c) => {
  const { id_cus } = c.req.param();
  const order = await orderService.getOrderByCustamer(id_cus);

  logger.debug(order);

  return c.json({
    code: HttpStatus.OK,
    status: "Get all by id Custamer Success",
    data: order,
  });
});

export default orderRouter;
