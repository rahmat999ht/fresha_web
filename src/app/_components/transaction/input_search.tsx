"use client";

import React, { useRef } from "react";
import styles from "./trans.module.css";
import { MdSearch } from "react-icons/md";
import { type IOrder } from "~/type/order";

type Props = {
  data: IOrder[];
};

function InputSearchTransaction(props: Props) {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    const value = props.data.filter(
      (item) =>
        item.orderBy.name == searchRef.current?.value
    );
    alert(value[0]?.orderBy.name);
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

export default InputSearchTransaction;
