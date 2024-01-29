import type { Prisma } from "@prisma/client";
import { db } from "~/server/db";

type FindFirstProps = Prisma.ProductFindFirstArgs;
type FindUniqProps = Prisma.ProductFindUniqueArgs;

export function getProductFirst(fineManyProps: FindFirstProps) {
  return db.product.findFirst(fineManyProps);
}

export function getProductUniq(fineManyProps: FindUniqProps) {
  return db.product.findUnique(fineManyProps);
}
