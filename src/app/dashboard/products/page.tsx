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
import { MdAdd } from "react-icons/md";
import { Button, Link } from "@nextui-org/react";
import styles from "./product.module.css";

// import { type ChipProps } from "@nextui-org/react";
import { EditIcon } from "public/icons/EditIcon";
import { DeleteIcon } from "public/icons/DeleteIcon";
import { EyeIcon } from "public/icons/EyeIcon";
import { columns, product } from "public/data/products";
import Cards from "~/app/_components/dashboard/cards/cards";
import { cards } from "public/data/cards";

// const statusColorMap: Record<string, ChipProps["color"]> = {
//   active: "success",
//   paused: "danger",
//   vacation: "warning",
// };

type Products = (typeof product)[0];

function Product() {
  const renderCell = React.useCallback((user: Products, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Products];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.image }}
            description={user.category}
            name={cellValue}
          >
            {user.name}
          </User>
        );
      case "stock":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            {/* <p className="text-bold text-sm capitalize text-default-400">
              {user.stock}
            </p> */}
          </div>
        );
      case "price":
        return (
          <Chip
            className="capitalize"
            // color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {user.price}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details product">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit product">
              <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete product">
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
    <Card className="px-1 py-1">
      <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
        <div className="my-4 grid grid-cols-2 flex-wrap gap-x-4 gap-y-4 sm:grid-cols-4">
          {cards.map((item) => (
            <Cards item={item} key={item.id} />
          ))}
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-2 ">
        <div className={styles.container}>
          <div className={styles.spaceBetween}>
            <h2 className={styles.title}>Product Fresha</h2>
            <Link className={styles.title} href="/dashboard/products/addProduct">
              <Button color="success" startContent={<MdAdd />}>
                Product
              </Button>
            </Link>
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
            <TableBody items={product}>
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

export default Product;
