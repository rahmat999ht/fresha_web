import { api } from "~/trpc/server";
import TableTransaction from "~/app/_components/transaction/table_trans";
import { type IOrder } from "~/type/order";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import styles from "./trans.module.css";
import CardHeaderTransaction from "~/app/_components/transaction/header_data";
import InputSearchTransaction from "~/app/_components/transaction/input_search";

const OrderPage: React.FC = async () => {
  const data: IOrder[] = await api.order.getAll.query() as IOrder[];
  
  return (
    <Card className="px-1 py-1">
      <CardHeader className="my-4 w-full flex-col items-start px-4 pb-0 pt-2">
        <div className={styles.spaceBetween}>
          <CardHeaderTransaction data = {data}/>
          <InputSearchTransaction data={data} />
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2 ">
        <div className={styles.container}>
          <div className={styles.spaceBetween}>
            <h2 className={styles.title}>Custamer Fresha</h2>
          </div>
          <TableTransaction data={data} />
        </div>
      </CardBody>
    </Card>
  );
};

export default OrderPage;
