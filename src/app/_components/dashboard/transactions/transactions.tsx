"use client";

import React from "react";
import { type ChipProps } from "@nextui-org/react";
import styles from "./transactions.module.css";
import { columns, transactions } from "public/data/transactions";
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
  // Card,
  // CardHeader,
  // CardBody,
  // Pagination,
} from "@nextui-org/react";

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
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
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
  );
};

export default Transactions;
