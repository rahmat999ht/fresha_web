import type { Product } from "@prisma/client";
import { db } from "~/server/db";

export function decreaseStockProduct(id: string, amount: number) {
  return db.product.update({
    where: { id: id },
    data: {
      stock: {
        decrement: amount,
      },
    },
  });
}

export function getsProduct(): Promise<Product[]> {
  return db.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export function getsProductCount() {
  return db.product.count();
}

export function getProductFirst(id: string): Promise<Product | null> {
  return db.product.findFirst({
    where: { id },
    orderBy: { createdAt: "desc" },
  });
}

export function getsProductRekomen(list_hastag: string[]): Promise<Product[]> {
  return db.product.findMany({
    where: { hastag_ml: { in: list_hastag } },
    orderBy: { createdAt: "desc" },
  });
}
