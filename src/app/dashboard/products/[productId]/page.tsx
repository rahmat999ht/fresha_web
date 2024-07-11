import styles from "./productUp.module.css";

import { FormUpdateProduct } from "~/app/_components/product/form_update_product";
// import { getProduct } from "~/services/product.service";
import * as productService from "../../../../services/product.service";

const ProductUpdate =  async ({params} : {params : {productId :string}}) => {

  const product = await productService.getProduct(params.productId);

  if (!product) {
    return (
      <div className={styles.container}>
        <p>Product not found</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <FormUpdateProduct data={product} />
      {/* sudah di perbaiki */}
    </div>
  );
};

export default ProductUpdate;
