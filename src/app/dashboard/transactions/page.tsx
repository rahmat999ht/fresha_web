import React from "react";
import { api } from "~/trpc/server";
import TableTransaction from "~/app/_components/transaction/table_trans";
import { type IOrder } from "~/type/order.schema";

const Product: React.FC = async () => {
  const data: IOrder[] = await api.order.getAll.query() as IOrder[];
 
  return <TableTransaction data={data} />;
};

export default Product;
