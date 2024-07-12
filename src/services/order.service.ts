import pagination, { type TQueryPage } from "~/utils/pagination";
import * as orderRepo from "~/repository/order";
import { type OrderProps } from "~/type/order";

export const createOrder = async (create: OrderProps) => {
  const order = await orderRepo.createOrderRepo(create);

  console.log(JSON.stringify({ order }, null, 2));

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


