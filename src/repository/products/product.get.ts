import { db } from "~/server/db";

export function getProductFirst(id: string) {
  return db.product.findFirst({
    where: { id },
    orderBy: { createdAt: "desc" },
    include: {
      order: true,
    },
  });
}
