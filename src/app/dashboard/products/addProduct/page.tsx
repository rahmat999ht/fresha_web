import styles from "./productAdd.module.css";
import { FormCreateProduct } from "~/app/_components/product/form_create_product";

const AddProduct: React.FC = async () => {

  return (
    <div className={styles.container}>
      <FormCreateProduct />
    </div>
  );
};

export default AddProduct;
