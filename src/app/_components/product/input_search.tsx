"use client";

import React, { type  MouseEventHandler, type KeyboardEventHandler } from "react";
import styles from "./product.module.css";
import { MdSearch } from "react-icons/md";
// import { type ReadonlyURLSearchParams } from "next/navigation";

type Props = {
  // searchParams: ReadonlyURLSearchParams,
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
        // defaultValue={props.searchParams.get('query')?.toString()}
      />
    </div>
  );
}

export default InputSearchProduct;
