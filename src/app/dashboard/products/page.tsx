import React from "react";
import { type IProduct } from "~/type/product";
import { api } from "~/trpc/server";
import TableProduct from "../../_components/product/table_product";

const ProductPage: React.FC = async () => {
  const data: IProduct[] = await api.product.getAll.query() as IProduct[];

  return <TableProduct data={data} />;
};

export default ProductPage;
