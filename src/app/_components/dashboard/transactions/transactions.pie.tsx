"use client";

import * as React from "react";
import styles from "./transactions.module.css";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";

const data = [
  { value: 5, label: "Cabe" },
  { value: 10, label: "Sayur" },
  { value: 15, label: "Bawang" },
  { value: 20, label: "Biji-bijian" },
];

const size = {
  width: 600,
  height: 400,
};

export default function PieArcLabel() {
  return (
    <div className="w-full">
      <h2 className={styles.title}>Category Product</h2>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 25,
            data,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        {...size}
      />
    </div>
  );
}
