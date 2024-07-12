import type { ProductsOnOrder } from "@prisma/client";
import { z } from "zod";

export const updateStockProductSchema = z.object({
  stock: z.number().positive().int(), // Rewritten line
});

export const idProductSchema = z.object({
  id: z.string().cuid(),
});

export interface IProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  hastag_ml: string;
  desc: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  // createdBy: User ;
  createdById: string;
  listOrder: ProductsOnOrder[];
}
