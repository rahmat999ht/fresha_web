import { Hono } from "hono";
import { queryPageSchema } from "~/utils/pagination";

// import HttpStatus from "~/utils/http-utils";
// import logger from "~/utils/logger";

import * as productService from "./product.service";
import { authMiddleware } from "../auth/auth.middelware";
// import { createUserSchema, updateUserSchema } from "./user.schema";
// import { idSchema, queryPageSchema } from "~/schemas";
// import { setCache } from "~/services/redis";
// import validatorSchemaMiddleware from "~/middlewares/validator";
// import cacheMiddleware from "~/middlewares/cache";
// import { authMiddleware } from "~/middlewares/auth";
// import type { TVariables } from "~/types";

const productRouter = new Hono();

/**
 * Middleware to check if data is cached in Redis
 * If cached data exists, return it
 * Otherwise call next() to continue request processing
 */
// productRouter.use("*", authMiddleware);
// productRouter.use("*", cacheMiddleware);

productRouter.get("/", async (c) => {
  const query = c.req.query();

  const queryPage = queryPageSchema.parse(query);
  const products = await productService.getsProduct(queryPage);

  return c.json({
    code: 200,
    status: "Ok",
    ...products,
  });
});

productRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await productService.getProduct(id);

  return c.json({
    code: 200,
    status: "Ok",
    data: user,
  });
});

//  userRouter.post(
//   "/",
//   validatorSchemaMiddleware("json", createUserSchema),
//   async (c) => {
//     const data = c.req.valid("json");
//     const user = await userService.createUser(data);

//     logger.debug(user);

//     return c.json({
//       code: HttpStatus.OK,
//       status: "Ok",
//       data: user,
//     });
//   },
// );

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

export default productRouter;
