import type { Product } from "@prisma/client";
import { db } from "~/server/db";

export function getsProduct(): Promise<Product[]> {
  return db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      order: true,
    },
  });
}

export function getsProductCount() {
  return db.product.count();
}
