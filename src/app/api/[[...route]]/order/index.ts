import { Hono } from "hono";
import { queryPageSchema } from "~/utils/pagination";

import * as orderService from "./order.service";
import { authMiddleware } from "../auth/auth.middelware";
import logger from "~/utils/logger";
import { HttpStatus } from "~/utils/http_status";
import validatorSchemaMiddleware from "~/utils/validate_midleware";
import { orderSchema } from "~/repository/order";

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

  const queryPage = queryPageSchema.parse(query);
  const orders = await orderService.getsOrder(queryPage);

  return c.json({
    code: HttpStatus.OK,
    status: "Ok",
    ...orders,
  });
});

orderRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const order = await orderService.getOrder(id);

  logger.debug(order);

  return c.json({
    code: HttpStatus.OK,
    status: "Ok",
    data: order,
  });
});

orderRouter.post(
  "/",
  validatorSchemaMiddleware("json", orderSchema),
  async (c) => {
    const data = c.req.valid("json");
    const order = await orderService.createOrder(data);

    logger.debug(order);

    return c.json({
      code: HttpStatus.OK,
      status: "Ok",
      data: order,
    });
  },
);

// userRouter.put(
//   "/:id",
//   validatorSchemaMiddleware("json", updateUserSchema),
//   validatorSchemaMiddleware("param", idSchema),
//   async (c) => {
//     const userWithoutId = c.req.valid("json");
//     const { id } = c.req.valid("param");
//     const user = await userService.updateUser({
//       id,
//       ...userWithoutId,
//     });

//     logger.debug(user);

//     return c.json({
//       code: HttpStatus.OK,
//       status: "Ok",
//       data: user,
//     });
//   },
// );

// userRouter.delete(
//   "/:id",
//   validatorSchemaMiddleware("param", idSchema),
//   async (c) => {
//     const { id } = c.req.valid("param");
//     const user = await userService.deleteUser({ id });
//     logger.debug(user);

//     return c.json({
//       code: HttpStatus.OK,
//       status: "Ok",
//       data: user,
//     });
//   },
// );

export default orderRouter;
