import React from "react";
import { type IProduct } from "~/type/iProduct";
import { api } from "~/trpc/server";
import TableProduct from "../../_components/product/table_product";
// import { Pagination } from "@nextui-org/react";
const Product: React.FC = async () => {
  const data: IProduct[] = await api.product.getAll.query();
  
  return (
      <TableProduct data={data} />
  );
};

export default Product;
