import React from "react";
import { type IProduct } from "~/type/iProduct";
import { api } from "~/trpc/server";
import TableProduct from "../../_components/product/table_product";
// import { Pagination } from "@nextui-org/react";

// interface Response {
//   data: IProduct[];
// }

const Product: React.FC = async () => {
  const data: IProduct[] = await api.product.getAll.query() as IProduct[];
  // const {data} : Response = await api.product.getAll.query();

  return <TableProduct data={data} />;
};

export default Product;
