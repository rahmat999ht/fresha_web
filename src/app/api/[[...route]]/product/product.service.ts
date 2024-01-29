import pagination, { type TQueryPage } from "~/utils/pagination";
import * as productRepo from "~/repository/products";

export const getsProduct = async ({ page, perPage }: TQueryPage) => {
  const productPagination = await pagination({
    page,
    perPage,
    getData: productRepo.getsProduct,
    getDataCount: () => productRepo.getsProductCount(undefined),
  });

  return productPagination;
};

export const getProduct = async (id: string) => {
  const product = await productRepo.getProductFirst({ where: { id } });

  return product;
};
