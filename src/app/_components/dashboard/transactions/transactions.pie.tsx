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
  width: 400,
  height: 200,
};

export default function PieArcLabel() {
  return (
    <div style={{ width: "100%" }}>
      <h2 className={styles.title}>Category Product</h2>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.label} (${item.value})`,
            arcLabelMinAngle: 45,
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
