import type { Custamer, Prisma, Product } from "@prisma/client";
import { z } from "zod";

export type FindManyProps = Prisma.OrderFindManyArgs | undefined;
export type OrderProps = z.infer<typeof orderCreateSchema>;
export type OrderWhereProps = Prisma.OrderWhereUniqueInput;
export type FindFirstProps = Prisma.OrderFindFirstArgs;
export type FindUniqProps = Prisma.OrderFindUniqueArgs;

export const idOrderSchema = z.object({ id: z.string() });

export const orderUpdateSchema = z.object({
  id: z.string().cuid(),
  status: z.string().min(0, "status harus diisi"),
});

export const orderCreateSchema = z.object({
  status: z.string().min(0, "status harus diisi"),
  totBuy: z.number().min(1, "totBuy harus diisi"),
  orderById: z.string(),
  listProduct: z.array(
    z.object({
      productId: z.string(),
      // orderId: z.string(),
      quantity: z.number().min(1, "quantity harus diisi"),
      totPrice: z.number().min(1, "totPrice harus diisi"),
     })
  ),
});

export interface IOrder {
  id: string;
  status: string;
  totBuy: number;
  orderById: string;
  createdAt: Date;
  updatedAt: Date;
  listProduct: Product[];
  orderBy: Custamer;
}


