import * as customerRepo from "~/repository/costumer";
import { type UpdateCustomerProps } from "~/type/customer";
import pagination, { type TQueryPage } from "~/utils/pagination";

export const getsCustomer = async ({ page, perPage }: TQueryPage) => {
  const custamerPagination = await pagination({
    page,
    perPage,
    getData: customerRepo.getsCustomer,
    getDataCount: () => customerRepo.getCustamerCount(),
  });

  return custamerPagination;
};

export const getCustomer = async (id: string) => {
  const customer = await customerRepo.getCustamerFirst(id);
  return customer;
};

export const updateCustamer = async (update: UpdateCustomerProps) => {
  const customer = await customerRepo.updateCustamer(update);

  return customer;
};
