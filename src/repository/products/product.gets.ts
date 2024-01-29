import type { Prisma } from "@prisma/client";
import { db } from "~/server/db";

type FindManyProps = Prisma.ProductFindManyArgs | undefined;

export function getsProduct(fineManyProps: FindManyProps) {
  return db.product.findMany(fineManyProps);
}
export function getsProductCount(fineManyProps: FindManyProps) {
  return db.product.count({ where: fineManyProps?.where });
}
