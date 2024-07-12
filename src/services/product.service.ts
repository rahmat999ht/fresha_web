import pagination, { type TQueryPage } from "~/utils/pagination";
import * as productRepo from "~/repository/products";

export const getsProduct = async ({ page, perPage }: TQueryPage) => {
  const productPagination = await pagination({
    page,
    perPage,
    getData: productRepo.getsProduct,
    getDataCount: () => productRepo.getsProductCount(),
  });
  getsProduct;

  return productPagination;
};

export const getProduct = async (id: string) => {
  const product = await productRepo.getProductFirst(id);

  return product;
};

export const getsRekomenProduct = async (list_hastag: string[]) => {
  const product = await productRepo.getsProductRekomen(list_hastag);

  return product;
};

export const decreaseProductStock = async (id: string, stock: number) => {
  const product = await productRepo.decreaseStockProduct(id, stock);

  return product;
};
