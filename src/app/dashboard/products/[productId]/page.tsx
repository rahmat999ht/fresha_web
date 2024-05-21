import styles from "./productUp.module.css";

import { UpdateProduct } from "~/app/_components/product/update-product";

function ProductUpdate({ params }: { params: { productId: string } }) {
  return (
    <div className={styles.container}>
      <UpdateProduct />
    </div>
  );
};

export default ProductUpdate;
