// TransactionsLine.tsx
"use client";

import React from "react";
import styles from "./transactions.module.css";
import { LineChart } from "@mui/x-charts/LineChart";
import { type IOrder } from '~/type/order';

interface TransactionsLineProps {
  orders: IOrder[];
}

const TransactionsLine: React.FC<TransactionsLineProps> = ({ orders }) => {
  // Menghitung jumlah transaksi per hari dalam 7 hari terakhir
  const today = new Date();
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  }).reverse();

  const transactionCounts = last7Days.map(date => {
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      return orderDate === date;
    }).length;
  });

  return (
    <div>
      <h2 className={styles.title}>Transaction Weekly</h2>
      <LineChart
        xAxis={[{ data: last7Days }]}
        series={[
          {
            data: transactionCounts,
            showMark: ({ index }) => index % 2 === 0,
          },
        ]}
        width={700}
        height={420}
      />
    </div>
  );
};

export default TransactionsLine;
