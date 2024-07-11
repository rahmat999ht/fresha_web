import ProductView from "./view";
import { getAllProduct } from "~/services/admin.service";
import { type IProduct } from "~/type/product";

const ProductPage: React.FC = () => {
  const data: Promise<IProduct[]> = getAllProduct();

  return <ProductView data={data} />;

};

export default ProductPage;
