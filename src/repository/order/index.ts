import type { Order } from "@prisma/client";
import { db } from "~/server/db";
import { type OrderProps } from "~/type/order";

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

export function getOrderFirst(id: string): Promise<Order> {
  return db.order.findFirst({
    where: { id },
    orderBy: { createdAt: "desc" },
    include: {
      product: true,
      orderBy: true,
    },
  })as Promise<Order>;
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

export function getsOrderCount() : Promise<number> {
  return db.product.count() as Promise<number>;
}
