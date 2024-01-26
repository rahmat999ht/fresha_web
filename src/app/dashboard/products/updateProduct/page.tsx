import styles from "./addUser.module.css";

import { api } from "~/trpc/server";
import { CreateProduct } from "~/app/_components/product/create-product";

const AddProduct: React.FC = async () => {

  const getAll = await api.product.getAll.query();

  return (
    <div className={styles.container}>
      {getAll.length > 0 ? (
        getAll.map((item, index) => (
          <p key={index} className="truncate">
            Your most recent post: {item.name}
          </p>
        ))
      ) : (
        <p className="truncate">kosong</p>
      )}
      <CreateProduct />
    </div>
  );
};

export default AddProduct;
