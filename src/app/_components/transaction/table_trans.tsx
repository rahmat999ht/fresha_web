"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Card,
  CardBody,
  Pagination,
  type ChipProps,
  Tooltip,
  Link,
} from "@nextui-org/react";
import { columns } from "public/data/transactions";
// import Cards from "~/app/_components/dashboard/cards/cards";
// import { cards } from "public/data/cards";
import styles from "./trans.module.css";
import React from "react";
// import { useRouter } from "next/navigation";
import { type IOrder } from "~/type/order.schema";
import OpenModal, { type IModal } from "../open_modal";
import { EyeIcon } from "public/icons/EyeIcon";
import { EditIcon } from "public/icons/EditIcon";

interface TableOrderProps {
  data: IOrder[]; // Menggunakan React.ReactNode untuk menangani konten dinamis
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  selesai: "success",
  diproses: "danger",
};

function TableTransaction({ data }: TableOrderProps) {
  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  const renderCell = React.useCallback(
    (item: IOrder, columnKey: React.Key): React.ReactNode => {
      const cellValue = item[columnKey as keyof IOrder];
      const modalView: IModal = {
        title: item.status,
        image: item.status,
        subTitle: item.status,
        content: item.amount.toString(),
        desc: item.totPrice.toString(),
      };

      switch (columnKey) {
        case "customer":
          return (
            <User
              avatarProps={{ radius: "lg", src: item.orderById }}
              description={item.updatedAt.toDateString()}
              name={item.orderById}
            >
              {item.updatedAt.toDateString()}
            </User>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[item.status]}
              size="sm"
              variant="flat"
            >
              {item.status}
            </Chip>
          );
        case "product":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{item.productId}</p>
            </div>
          );
        case "price":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {item.totPrice} /{item.amount}
              </p>
            </div>
          );

        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <OpenModal
                data={modalView}
                toOpen={
                  <Tooltip content="Details product">
                    <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                }
              />
              <Link href="/dashboard/products/updateProduct">
                <Tooltip content="Edit product">
                  <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                    <EditIcon />
                  </span>
                </Tooltip>
              </Link>
            </div>
          );
        default:
          return cellValue instanceof Date ? cellValue.toString() : cellValue;
      }
    },
    [],
  );

  return (
    <Card className="px-1 py-1">
      {/* <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <div className="my-4 grid grid-cols-2 flex-wrap gap-x-4 gap-y-4 sm:grid-cols-4">
          {cards.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </div>
      </CardHeader> */}
      <CardBody className="overflow-visible py-2 ">
        <div className={styles.container}>
          <div className={styles.spaceBetween}>
            <h2 className={styles.title}>Transaction Fresha</h2>
          </div>
          <Table aria-label="Example table with custom cells">
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  {(columnKey) => (
                    <TableCell key={columnKey}>
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="my-4 flex  justify-center">
          <Pagination color="warning" initialPage={3} total={10} />
        </div>
      </CardBody>
    </Card>
  );
}

export default TableTransaction;
