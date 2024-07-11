"use client";

import React from "react";
import styles from "./transactions.module.css";
import { LineChart } from "@mui/x-charts/LineChart";

const TransactionsLine: React.FC = () => {
  return (
    <div>
      <h2 className={styles.title}>Transaction weekly</h2>
        <LineChart
          xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7] }]}
          series={[
            {
              data: [2, 3, 5.5, 8.5, 1.5, 5, 1],
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
