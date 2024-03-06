"use client"

import React, { useRef } from "react";
import styles from "./custamer.module.css";
import { MdSearch } from "react-icons/md";
import { type ICustomer } from "~/type/customer";

type Props = {
  data: ICustomer[];
};

function InputSearch(props: Props) {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    const value = props.data.filter(
      (item) =>
        item.name == searchRef.current?.value ||
        item.email == searchRef.current?.value,
    );
    alert(value[0]?.email);
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

export default InputSearch;
