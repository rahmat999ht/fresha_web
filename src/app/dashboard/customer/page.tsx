"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  Pagination,
} from "@nextui-org/react";
import styles from "./customer.module.css";
import { type ChipProps } from "@nextui-org/react";
import { EditIcon } from "public/icons/EditIcon";
import { EyeIcon } from "public/icons/EyeIcon";
import { columns, users } from "public/data/users";
// import Cards from "~/app/_components/dashboard/cards/cards";
// import { cards } from "public/data/cards";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

type User = (typeof users)[0];

export default function Customer() {
  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>Edit
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
          <h2 className={styles.title}>Customers Fresha</h2>

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
            <TableBody items={users}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
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
