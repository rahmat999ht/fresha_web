"use client";

import React, { type  MouseEventHandler, type KeyboardEventHandler } from "react";
import styles from "./trans.module.css";
import { MdSearch } from "react-icons/md";

type Props = {
  searchRef : React.MutableRefObject<HTMLInputElement | null>;
  handleSearch : KeyboardEventHandler<HTMLInputElement> | undefined;
  handleSearchIconClick : MouseEventHandler<SVGElement> | undefined;
};

function InputSearchTransaction(props: Props) {

  return (
    <div className={styles.search}>
      <MdSearch onClick={props.handleSearchIconClick} />
      <input
        type="text"
        placeholder="Search..."
        className={styles.input}
        ref={props.searchRef}
        onKeyDown={props.handleSearch}
      />
    </div>
  );
}

export default InputSearchTransaction;
