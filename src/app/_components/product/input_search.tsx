"use client";

import React, { type  MouseEventHandler, type KeyboardEventHandler } from "react";
import styles from "./custamer.module.css";
import { MdSearch } from "react-icons/md";

type Props = {
  searchRef : React.MutableRefObject<HTMLInputElement | null>;
  handleSearch : KeyboardEventHandler<HTMLInputElement> | undefined;
  handleSearchIconClick : MouseEventHandler<SVGElement> | undefined;
};

function InputSearchProduct(props: Props) {

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

export default InputSearchProduct;
