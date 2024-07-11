import type { Order } from "@prisma/client";
import { db } from "~/server/db";
import { type OrderProps } from "~/type/order";

export function getOrderFirst(id: string): Promise<Order> {
  return db.order.findFirst({
    where: { id },
    orderBy: { createdAt: "desc" },
    include: {
      listProduct: {
        include:{
          product:true,
        }
      },
      orderBy: true,
    },
  }) as Promise<Order>;
}

export function getsOrder(): Promise<Order[]> {
  return db.order.findMany() as Promise<Order[]>;
}

export function getsOrderCount(): Promise<number> {
  return db.product.count() as Promise<number>;
}

export function createOrderRepo(input: OrderProps): Promise<Order> {
  return db.order.create({
    data: {
      status: input.status,
      totBuy: input.totBuy,
      orderById: input.orderById,
      listProduct: {
        create: input.listProduct.map((product) => ({
          productId: product.productId,
          // orderId: product.orderId,
          quantity: product.quantity,
          totPrice: product.totPrice,
        })),
      },
    },
    include: {
      listProduct: true,
    },
  });
}

/*
    Creation order matches the input order

    {
    "newGroupWithoutCapacity": {
        "id": 9,
        "name": "Group without capacity",
        "slots": [
        {
            "id": 25,
            "from": "2022-07-22T00:00:00.000Z",
            "groupId": 9,
            "capacityId": null
        },
        {
            "id": 26,
            "from": "2022-07-23T00:00:00.000Z",
            "groupId": 9,
            "capacityId": null
        },
        {
            "id": 27,
            "from": "2022-07-24T00:00:00.000Z",
            "groupId": 9,
            "capacityId": null
        }
        ]
    }
    }
*/
