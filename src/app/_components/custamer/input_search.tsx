"use client";

import React, { type KeyboardEvent, useRef, type MouseEvent } from "react";
import styles from "./custamer.module.css";
import { MdSearch } from "react-icons/md";
import { type ICustomer } from "~/type/customer";

type Props = {
  data: ICustomer[];
};

function InputSearchCustamer(props: Props) {
  const searchRef = useRef<HTMLInputElement | null>(null);

  const handleSearch = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      performSearch();
    }
  };

  const handleSearchIconClick = (event: MouseEvent<SVGElement>) => {
    event.preventDefault();
    performSearch();
  };

  const performSearch = () => {
    const keyword = searchRef.current?.value.toLowerCase();
    if (!keyword) return;

    const value = props.data.filter(
      (item) =>
        item.email.toLowerCase().includes(keyword)
    );
    if (value.length == 0) {
      alert("No matching result found.");
    }
    alert(value[0]?.email);
  };

  return (
    <div className={styles.search}>
      <MdSearch onClick={handleSearchIconClick} />
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        ref={searchRef}
        onKeyDown={handleSearch}
      />
    </div>
  );
}

export default InputSearchCustamer;
