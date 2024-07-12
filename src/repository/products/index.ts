import type { Product } from "@prisma/client";
import { db } from "~/server/db";
// import { IProduct } from "~/type/product";

export function getsProduct(): Promise<Product[]> {
  return db.product.findMany({
    orderBy: { createdAt: "desc" },
    // include: {
    //   order: true,
    // },
  });
}

export function getsProductCount() {
  return db.product.count();
}

export function getProductFirst(id: string): Promise<Product | null> {
  return db.product.findFirst({
    where: { id },
    orderBy: { createdAt: "desc" },
    // include: {
    //   order: true,
    // },
  });
}

export function getsProductRekomen(list_hastag: string[]): Promise<Product[]> {
  return db.product.findMany({
    where: { hastag_ml: { in: list_hastag } },
    orderBy: { createdAt: "desc" },
  });
}
