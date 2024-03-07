import { api } from "~/trpc/server";
import TableCustamer from "~/app/_components/custamer/table_custamer";
import { type ICustomer } from "~/type/customer";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import CardHeaderCustamer from "~/app/_components/custamer/header_data";
import InputSearchCustamer from "~/app/_components/custamer/input_search";
import styles from "./custamer.module.css";

const CustamerPage: React.FC = async () => {
  const data: ICustomer[] = (await api.custamer.getAll.query()) as ICustomer[];

  return (
    <Card className="px-1 py-1">
      <CardHeader className="my-4 w-full flex-col items-start px-4 pb-0 pt-2">
        <div className={styles.spaceBetween}>
          <CardHeaderCustamer data = {data}/>
          <InputSearchCustamer data={data} />
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2 ">
        <div className={styles.container}>
          <div className={styles.spaceBetween}>
            <h2 className={styles.title}>Custamer Fresha</h2>
          </div>
          <TableCustamer data={data} />
        </div>
      </CardBody>
    </Card>
  );
};

export default CustamerPage;
