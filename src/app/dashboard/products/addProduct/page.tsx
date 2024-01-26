import styles from "./addUser.module.css";
import { CreateProduct } from "~/app/_components/product/create-product";

const AddProduct: React.FC = async () => {

  return (
    <div className={styles.container}>
      <CreateProduct />
    </div>
  );
};

export default AddProduct;
