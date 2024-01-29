import type { Prisma } from "@prisma/client";
import { db } from "~/server/db";

type FindManyProps = Prisma.ProductFindManyArgs | undefined;

function getsProduct(fineManyProps: FindManyProps) {
  return db.product.findMany(fineManyProps);
}

export default getsProduct;
