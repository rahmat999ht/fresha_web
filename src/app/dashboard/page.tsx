import React from "react";
import { cards } from "public/data/cards";
import Cards from "../_components/dashboard/cards/cards";
// import Chart from "../_components/dashboard/chart/chart";
import styles from "../_components/dashboard/dashboard.module.css";
import Rightbar from "../_components/dashboard/rightbar/rightbar";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import TransactionsLine from "../_components/dashboard/transactions/transactionsLine";
import TransactionsBars from "../_components/dashboard/transactions/transactionsBars";

const Dashboard: React.FC = () => {
  return (
    <Card className="px-1 py-1">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <div className="my-4 grid grid-cols-2 flex-wrap gap-x-4 gap-y-4 sm:grid-cols-4">
          {cards.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <div className={styles.container}>
        <TransactionsLine />
        <TransactionsBars />

          {/* <div className={styles.cardBodyContainer}>
          </div>
          <div className={styles.rightbar}>
            <Rightbar />
          </div> */}
        </div>
      </CardBody>
    </Card>
  );
};

export default Dashboard;
