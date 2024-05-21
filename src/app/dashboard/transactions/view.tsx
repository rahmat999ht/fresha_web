"use client";

import { Card, CardBody, CardHeader } from "@nextui-org/react";
import styles from "./trans.module.css";
import React, {
  type KeyboardEvent,
  type MouseEvent,
  useRef,
  useState,
  useEffect,
} from "react";
import { PaginationCustom } from "~/app/_components/pagination_custom";
import { type IOrder } from "~/type/order";
import CardHeaderTransaction from "~/app/_components/transaction/header_data";
import InputSearchTransaction from "~/app/_components/transaction/input_search";
import TableTransaction from "~/app/_components/transaction/table_trans";

type Props = {
  data: Promise<IOrder[]>;
};

const TransactionView = (props: Props) => {
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [isServer, setServer] = useState(false);
  const [originalData, setOriginalData] = useState<IOrder[]>([]);
  // const [searchResults, setSearchResults] = useState<ICustomer[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const pages = Math.ceil(originalData.length / rowsPerPage);

  const handleDataCustamer = async () => {
    setServer(true);
    try {
      const initData = await props.data;
      setOriginalData(initData);
      setServer(false);
    } catch (error) {
      setServer(false);
    }
  };

  useEffect(() => {
    void handleDataCustamer();
  });

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return originalData.slice(start, end);
  }, [page, originalData]);

  const handleSearchEnter = (event: KeyboardEvent<HTMLInputElement>) => {
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

    const value = originalData.filter((item) =>
      item.orderBy.email!.toLowerCase().includes(keyword),
    );

    // const value = props.data;
    if (value.length == 0) {
      alert("No matching result found.");
    } else {
      setOriginalData(value);
      // items = value;
      setPage(1);
      alert(value[0]?.orderBy.email);
    }
  };

  if (isServer) {
    return <h2>Data Loading...</h2>;
  } else {
    return (
      <Card className="px-1 py-1">
        <CardHeader className="my-4 w-full flex-col items-start px-4 pb-0 pt-2">
          <div className={styles.spaceBetween}>
            <CardHeaderTransaction data={originalData} />
            <InputSearchTransaction
              searchRef={searchRef}
              handleSearch={handleSearchEnter}
              handleSearchIconClick={handleSearchIconClick}
            />
          </div>
        </CardHeader>
        <CardBody className="overflow-visible py-2 ">
          <div className={styles.container}>
            <div className={styles.spaceBetween}>
              <h2 className={styles.title}>Custamer Fresha</h2>
            </div>
            <TableTransaction
              data={items}
              bottomContent={
                <PaginationCustom page={page} pages={pages} setPage={setPage} />
              }
            />
          </div>
        </CardBody>
      </Card>
    );
  }
};

export default TransactionView;
