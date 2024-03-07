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
import { columns } from "public/data/users";
import React from "react";
import OpenModal, { type IModal } from "../open_modal";
import { EyeIcon } from "public/icons/EyeIcon";
import { EditIcon } from "public/icons/EditIcon";
import { type ICustomer } from "~/type/customer";
import { PaginationCustom } from "../pagination_custom";

interface TableCustamerProps {
  data: ICustomer[]; // Menggunakan React.ReactNode untuk menangani konten dinamis
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

function TableCustamer({ data }: TableCustamerProps) {
  const renderCell = React.useCallback(
    (item: ICustomer, columnKey: React.Key): React.ReactNode => {
      const cellValue = item[columnKey as keyof ICustomer];
      const modalView: IModal = {
        title: item.name,
        image: item.image,
        subTitle: item.isActive ? "Active" : "non Active",
        content: item.address,
        desc: item.phone,
      };

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{ radius: "lg", src: item.image }}
              description={item.email}
              name={item.name}
            >
              {item.name}
            </User>
          );
        case "status":
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[item.isActive.toString()]}
              size="sm"
              variant="flat"
            >
              {item.isActive ? "Active" : "non Active"}
            </Chip>
          );
        case "address":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {item.address ?? "kosong"}
              </p>
            </div>
          );
        case "phone":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {item.phone ?? "kosong"}
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
              <Link href="/dashboard">
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

export default TableCustamer;
