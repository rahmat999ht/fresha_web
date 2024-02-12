import type { Order, Prisma } from "@prisma/client";
import { z } from "zod";
import { db } from "~/server/db";
// import { type TCreateOrderProps } from "~/type/order";

// type createOrder = ;

export const orderSchema = z.object({
  status: z.string().min(0, "status harus diisi"),
  totPrice: z.number().min(1, "totPrice harus diisi"),
  amount: z.number().min(1, "amount harus diisi"),
  productId: z.string(),
  orderById: z.string(),
});

export type FindManyProps = Prisma.OrderFindManyArgs | undefined;
export type OrderProps = z.infer<typeof orderSchema>;
export type OrderWhereProps = Prisma.OrderWhereUniqueInput;

export type FindFirstProps = Prisma.OrderFindFirstArgs;
export type FindUniqProps = Prisma.OrderFindUniqueArgs;



export function createOrder(input: OrderProps): Promise<Order> {
  return db.order.create({ data:  {
    status: input.status,
    totPrice: input.totPrice,
    amount: input.amount,
    product: { connect: { id: input.productId } },
    orderBy: { connect: { id: input.orderById } },
  }, });
}

export function updateOrder(
  orderProps: OrderProps,
  id: OrderWhereProps,
): Promise<Order> {
  return db.order.update({
    where: id,
    data: orderProps,
  });
}

export function getOrderFirst(findFirstProps: FindFirstProps) {
  return db.order.findFirst(findFirstProps);
}

export function getOrderUniq(fineManyProps: FindUniqProps) {
  return db.order.findUnique(fineManyProps);
}

export function getsOrder(fineManyProps: FindManyProps): Promise<Order[]> {
  return db.order.findMany(fineManyProps) as Promise<Order[]>;
}

export function getsOrderCount() {
  return db.product.count();
}
