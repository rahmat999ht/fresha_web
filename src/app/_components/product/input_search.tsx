"use client";

import React, { useRef } from "react";
import styles from "./product.module.css";
import { MdSearch } from "react-icons/md";
import { type IProduct } from "~/type/product";

type Props = {
  data: IProduct[];
};

function InputSearchProduct(props: Props) {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    const value = props.data.filter(
      (item) =>
        item.name == searchRef.current?.value 
    );
    alert(value[0]?.name);
  };

  return (
    <div className={styles.search}>
      <MdSearch onClick={handleSearch} />
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        ref={searchRef}
      />
    </div>
  );
}

export default InputSearchProduct;
