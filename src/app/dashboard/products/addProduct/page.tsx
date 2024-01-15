import styles from "./addUser.module.css";

import { Input, Button } from "@nextui-org/react";

const AddProduct: React.FC = () => {
  return (
    <div className={styles.container}>
      <form
      //   onSubmit={addUser}
      // className={styles.form}
      >
        <div className="flex w-full flex-col gap-4">
          <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            <Input type="email" variant="flat" label="Email" />
            <Input type="email" variant="flat" label="Email" />
          </div>
          <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            <Input type="email" variant="flat" label="Email" />
            <Input type="email" variant="flat" label="Email" />
          </div>
          <div className="mb-6 flex w-full flex-wrap gap-4 md:mb-0 md:flex-nowrap">
            <Input type="email" variant="flat" label="Email" />
            <Input type="email" variant="flat" label="Email" />
          </div>
          <Button color="success" isLoading>
            Loading
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
