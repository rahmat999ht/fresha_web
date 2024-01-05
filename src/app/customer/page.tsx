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
  // type ChipProps,
  // getKeyValue,
} from "@nextui-org/react";
import { type ChipProps } from "@nextui-org/react";
import { EditIcon } from "public/icons/EditIcon";
import { DeleteIcon } from "public/icons/DeleteIcon";
import { EyeIcon } from "public/icons/EyeIcon";
import { columns, users } from "public/data";

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
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="cursor-pointer text-lg text-danger active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Card className="py-4">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <h4 className="mx-4 my-2 text-tiny font-bold uppercase">Customer</h4>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Card>
            <CardHeader className="flex-col items-start px-4 pb-0 pt-4">
              <h1 className="text-tiny font-bold uppercase">Active</h1>
            </CardHeader>
            <CardBody overflow-visible py-2>
              <p>200 / customer</p>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="flex-col items-start px-4 pb-0 pt-4">
              <h1 className="text-tiny font-bold uppercase">Puased</h1>
            </CardHeader>
            <CardBody overflow-visible py-2>
              <p>200 / customer</p>
            </CardBody>
          </Card>
        </div>
        {/* <p className="text-tiny font-bold uppercase">Daily Mix</p> */}
      </CardHeader>
      <CardBody className="overflow-visible py-2 ">
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
        <div className="flex justify-center  my-4">
          <Pagination color="warning" initialPage={3} total={10} />
        </div>
      </CardBody>
    </Card>
  );
}
