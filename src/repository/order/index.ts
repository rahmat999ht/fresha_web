import type { Order, Prisma } from "@prisma/client";
import { type z } from "zod";
import { db } from "~/server/db";
import type { orderCreateSchema } from "~/type/order.schema";
// import { type TCreateOrderProps } from "~/type/order";

// type createOrder = ;

export type FindManyProps = Prisma.OrderFindManyArgs | undefined;
export type OrderProps = z.infer<typeof orderCreateSchema>;
export type OrderWhereProps = Prisma.OrderWhereUniqueInput;

export type FindFirstProps = Prisma.OrderFindFirstArgs;
export type FindUniqProps = Prisma.OrderFindUniqueArgs;

export function createOrder(input: OrderProps): Promise<Order> {
  return db.order.create({
    data: {
      status: input.status,
      totPrice: input.totPrice,
      amount: input.amount,
      product: { connect: { id: input.productId } },
      orderBy: { connect: { id: input.orderById } },
    },
  });
}

export function getOrderFirst(id: string) {
  return db.order.findFirst({
    where: { id },
    orderBy: { createdAt: "desc" },
    include: {
      product: true,
      orderBy: true,
    },
  });
}

export function getsOrder(): Promise<Order[]> {
  return db.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      product: true,
      orderBy: true,
    },
  }) as Promise<Order[]>;
}

export function getsOrderCount() {
  return db.product.count();
}
