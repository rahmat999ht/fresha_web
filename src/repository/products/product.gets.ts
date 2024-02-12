import type { Prisma, Product } from "@prisma/client";
import { db } from "~/server/db";

type FindManyProps = Prisma.ProductFindManyArgs | undefined;

export function getsProduct(fineManyProps: FindManyProps): Promise<Product[]> {
  return db.product.findMany(fineManyProps);
}

export function getsProductCount() {
  return db.product.count();
}
