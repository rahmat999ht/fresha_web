"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  // Tooltip,
  Card,
  CardHeader,
  CardBody,
  Pagination,
} from "@nextui-org/react";
import styles from "./transaction.module.css";

import { type ChipProps } from "@nextui-org/react";
import { columns, transactions } from "public/data/transactions";
// import Cards from "~/app/_components/dashboard/cards/cards";
// import { cards } from "public/data/cards";

const statusColorMap: Record<string, ChipProps["color"]> = {
  done: "success",
  pending: "danger",
  cancelled: "warning",
};

type Transaction = (typeof transactions)[0];
const Transactions: React.FC = () => {
  const renderCell = React.useCallback(
    (transaction: Transaction, columnKey: React.Key) => {
      const cellValue = transaction[columnKey as keyof Transaction];

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: transaction.avatar }}
              description={transaction.email}
              name={cellValue}
            >
              {transaction.email}
            </User>
          );
        case "date":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize text-default-400">
                {transaction.date}
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[transaction.status]}
              size="sm"
              variant="flat"
            >
              {cellValue}
            </Chip>
          );
        case "amount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{cellValue}</p>
            </div>
          );

        default:
          return cellValue;
      }
    },
    [],
  );

  return (
    <Card className="px-1 py-1">
      {/* <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <div className="my-4 grid grid-cols-2 flex-wrap gap-x-4 gap-y-4 sm:grid-cols-4">
          {cards.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </div>
      </CardHeader> */}
      <CardBody className="overflow-visible py-2 ">
        <div className={styles.container}>
          <div className={styles.spaceBetween}>
            <h2 className={styles.title}>Transaction Fresha</h2>
            
          </div>
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={transactions}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="my-4 flex  justify-center">
          <Pagination color="warning" initialPage={3} total={10} />
        </div>
      </CardBody>
    </Card>
  );
};

export default Transactions;
