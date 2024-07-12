import { Hono } from "hono";
import { z } from "zod";
import { queryPageSchema } from "~/utils/pagination";

import * as productService from "../../../../services/product.service";
import logger from "~/utils/logger";
import { HttpStatus } from "~/utils/http_status";
import { zValidator } from "@hono/zod-validator";

export const stockSchema = z.object({
  id: z.string().min(1),
  stock: z.number().min(1),
});

const productRouter = new Hono();

productRouter.patch(
  "/",
  zValidator("json", stockSchema),
  async (c) => {
    const body = c.req.valid("json");

    const val = stockSchema.safeParse(body);
    if (!val.success) return c.text("Invalid!", 500);

    const product = await productService.decreaseProductStock(
      body.id,
      body.stock,
    );

    logger.debug(product);

    if (!product) {
      return c.json({
        code: HttpStatus.NOT_FOUND,
        status: "Not Found",
        message: "Product not found",
      });
    }

    return c.json({
      code: HttpStatus.OK,
      status: "Ok",
      data: product,
    });
  },
);

productRouter.get("/", async (c) => {
  const query = c.req.query();

  const { id } = query;
  const hastag1 = query.hastag1;
  const hastag2 = query.hastag2;
  if (hastag1 && hastag2) {
    const productsRekomen = await productService.getsRekomenProduct([
      hastag1,
      hastag2,
    ]);
    return c.json({
      code: HttpStatus.OK,
      status: "hastag_ml Ok",
      data: productsRekomen,
    });
  }

  if (id) {
    const product = await productService.getProduct(id);
    if (!product) {
      return c.json({
        code: HttpStatus.NOT_FOUND,
        status: "Not Found",
        message: "Product not found",
      });
    }
    return c.json({
      code: HttpStatus.OK,
      status: "Response Id Ok",
      data: product,
    });
  }

  const queryPage = queryPageSchema.parse(query);
  const products = await productService.getsProduct(queryPage);

  return c.json({
    code: HttpStatus.OK,
    status: "Response List Ok",
    ...products,
  });
});

productRouter.get("/:id", async (c) => {
  const { id } = c.req.param();
  const product = await productService.getProduct(id);

  if (!product) {
    return c.json({
      code: HttpStatus.NOT_FOUND,
      status: "Not Found",
      message: "Product not found",
    });
  }
  return c.json({
    code: HttpStatus.OK,
    status: "Response Id Ok",
    data: product,
  });
});

productRouter.get("/:hastag1/:hastag2", async (c) => {
  const { hastag1 } = c.req.param();
  const { hastag2 } = c.req.param();
  const productsRekomen = await productService.getsRekomenProduct([
    hastag1,
    hastag2,
  ]);
  return c.json({
    code: HttpStatus.OK,
    status: "Response hastag_ml Ok",
    data: productsRekomen,
  });
});

export default productRouter;
