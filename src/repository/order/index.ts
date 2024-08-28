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

export function getOrderCustamer(idCus: string): Promise<Order[]> {
  return db.order.findMany({
    where: { orderById : idCus },
    orderBy: { createdAt: "desc" },
    include: {
      listProduct: {
        include:{
          product:true,
        }
      },
    },
  }) as Promise<Order[]>;
}

export function getsOrder(): Promise<Order[]> {
  return db.order.findMany() as Promise<Order[]>;
}

export function getsOrderCount(): Promise<number> {
  return db.order.count() as Promise<number>;
}

export async function createOrderRepo(input: OrderProps): Promise<Order> {
  const createdOrder = await db.order.create({
    data: {
      status: input.status,
      totBuy: input.totBuy,
      orderById: input.orderById,
      listProduct: {
        create: input.listProduct.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
          totPrice: product.totPrice,
        })),
      },
    },
    include: {
      listProduct: true,
    },
  });

  // Mengurangi stok produk setelah order dibuat
  await Promise.all(
    input.listProduct.map(async (product) => {
      await db.product.update({
        where: { id: product.productId },
        data: {
          stock: {
            decrement: product.quantity,
          },
        },
      });
    })
  );


  // Posting hashtag dan update riwayat hashtag pelanggan
  await Promise.all(
    input.listProduct.map(async (product) => {
      const productDetails = await db.product.findUnique({
        where: { id: product.productId },
      });

      if (productDetails) {
        await db.hastagMl.create({
          data: {
            name: productDetails.hastag_ml,
            custamerId: input.orderById,
          },
        });

        // Anda juga dapat melakukan logika tambahan di sini jika diperlukan
        // misalnya: mengecek apakah hashtag sudah ada sebelumnya, dsb.
      }
    })
  );

  return createdOrder;
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
