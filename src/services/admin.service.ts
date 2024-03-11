import { api } from "~/trpc/server";
import { type ICustomer } from "~/type/customer";
import { type IOrder } from "~/type/order";
import { type IProduct } from "~/type/product";

export const getAllCustomer = async () => {
  const initData = (await api.custamer.getAll.query()) as ICustomer[];
  return initData;
};

export const getAllOrder = async () => {
  const initData = (await api.order.getAll.query()) as IOrder[];
  return initData;
};

export const getAllProduct = async () => {
  const initData = (await api.product.getAll.query()) as IProduct[];
  return initData;
};
