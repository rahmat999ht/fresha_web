// PieArcLabel.tsx
"use client";

import * as React from "react";
import styles from "./transactions.module.css";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { IProduct } from '~/type/product';

interface PieArcLabelProps {
  products: IProduct[];
}

const PieArcLabel: React.FC<PieArcLabelProps> = ({ products }) => {
  // Mengelompokkan produk berdasarkan kategori dan menjumlahkan stok
  const data = products.reduce((acc, product) => {
    const category = product.category;
    const existingCategory = acc.find(item => item.label === category);

    if (existingCategory) {
      existingCategory.value += product.stock;
    } else {
      acc.push({ value: product.stock, label: category });
    }

    return acc;
  }, [] as { value: number; label: string }[]);

  const size = {
    width: 600,
    height: 400,
  };

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
};

export default PieArcLabel;
