import React from "react";
import { cards } from "public/data/cards";
import Cards from "../_components/dashboard/cards/cards";
import styles from "../_components/dashboard/dashboard.module.css";
import { Card, CardBody } from "@nextui-org/react";
import TransactionsLine from "../_components/dashboard/transactions/transactionsLine";
import PieArcLabel from "../_components/dashboard/transactions/transactions.pie";
import { IProduct } from "~/type/product";
import { getAllProduct } from "~/services/admin.service";

const Dashboard: React.FC = () => {
  const data: Promise<IProduct[]> = getAllProduct();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid w-full grid-cols-3 flex-wrap gap-x-4  sm:flex-wrap">
        {cards.map((item) => (
          <Cards item={item} key={item.id} />
        ))}
      </div>
      <div className="grid w-full grid-cols-2 flex-wrap gap-x-4  sm:flex-wrap">
        <Card className="px-1 py-1">
          <CardBody className="overflow-visible py-2">
            <div className={styles.container}>
              <PieArcLabel />
            </div>
          </CardBody>
        </Card>
        <Card className="px-1 py-1">
          <CardBody className="overflow-visible py-2">
            <div className={styles.container}>
              <TransactionsLine />
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
