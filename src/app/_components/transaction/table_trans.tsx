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
  type ChipProps,
  Tooltip,
  Link,
} from "@nextui-org/react";
import { columns } from "public/data/transactions";
import React from "react";
import { type IOrder } from "~/type/order";
import OpenModal, { type IModal } from "../open_modal";
import { EyeIcon } from "public/icons/EyeIcon";
import { EditIcon } from "public/icons/EditIcon";
import { PaginationCustom } from "../pagination_custom";

interface TableOrderProps {
  data: IOrder[]; // Menggunakan React.ReactNode untuk menangani konten dinamis
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  selesai: "success",
  diproses: "danger",
};

function TableTransaction({ data }: TableOrderProps) {
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
              avatarProps={{
                radius: "lg",
                src: item.orderBy.image?.toString(),
              }}
              description={item.updatedAt.toDateString()}
              name={item.orderBy.name}
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
          const stringValue =
            cellValue instanceof Date
              ? cellValue.toString()
              : String(cellValue);
          return <span>{stringValue}</span>;
      }
    },
    [],
  );

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const pages = Math.ceil(data.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return data.slice(start, end);
  }, [page, data]);

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <PaginationCustom page={page} pages={pages} setPage={setPage} />
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
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
        {items.map((item, index) => (
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
  );
}

export default TableTransaction;
