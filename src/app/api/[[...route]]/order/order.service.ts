import pagination, { type TQueryPage } from "~/utils/pagination";
import * as orderRepo from "~/repository/order";
import type { OrderProps } from "~/repository/order";

export const createOrder = async (create: OrderProps) => {
  const order = await orderRepo.createOrder(create);

  return order;
};

export const getsOrder = async ({ page, perPage }: TQueryPage) => {
  const orderPagination = await pagination({
    page,
    perPage,
    getData: orderRepo.getsOrder,
    getDataCount: () => orderRepo.getsOrderCount(),
  });

  return orderPagination;
};

export const getOrder = async (id: string) => {
  const order = await orderRepo.getOrderFirst(id);

  return order;
};
