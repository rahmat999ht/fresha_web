import React from "react";
import { type IProduct } from "~/type/product";
import { api } from "~/trpc/server";
import TableProduct from "../../_components/product/table_product";
import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import styles from "./product.module.css";
import CardHeaderProduct from "~/app/_components/product/header_data";
import InputSearchProduct from "~/app/_components/product/input_search";
import { MdAdd } from "react-icons/md";

const ProductPage: React.FC = async () => {
  const data: IProduct[] = (await api.product.getAll.query()) as IProduct[];

  return (
    <Card className="px-1 py-1">
      <CardHeader className="my-4 w-full flex-col items-start px-4 pb-0 pt-2">
        <div className={styles.spaceBetween}>
          <CardHeaderProduct data={data} />
          <InputSearchProduct data={data} />
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2 ">
        <div className={styles.container}>
          <div className={styles.spaceBetween}>
            <h2 className={styles.title}>Product Fresha</h2>
            <Link
              className={styles.title}
              href="/dashboard/products/addProduct"
            >
              <Button color="success" startContent={<MdAdd />}>
                Product
              </Button>
            </Link>
          </div>
          <TableProduct data={data} />
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductPage;
