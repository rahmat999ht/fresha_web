import { Hono } from "hono";
import { queryPageSchema } from "~/utils/pagination";

import * as productService from "../../../../services/product.service";
// import { idProductSchema, updateStockProductSchema } from "~/type/product";
// import validatorSchemaMiddleware from "~/utils/validate_midleware";
import logger from "~/utils/logger";
import { HttpStatus } from "~/utils/http_status";

const productRouter = new Hono();

type Stock = { stock: number  };


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

productRouter.put(
  "/:id",
  // validatorSchemaMiddleware("json", updateStockProductSchema),
  // validatorSchemaMiddleware("param", idProductSchema),
  async (c) => {
    const producStock : Stock =  await c.req.json();
    const { id } = c.req.param();
    const product = await productService.decreaseProductStock(id, producStock.stock);

    logger.debug(product);

    return c.json({
      code: HttpStatus.OK,
      status: "Ok",
      data: product,
    });
  },
);

export default productRouter;
