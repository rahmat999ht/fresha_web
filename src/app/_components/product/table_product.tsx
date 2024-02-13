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
  Tooltip,
  Card,
  // CardHeader,
  CardBody,
  Pagination,
} from "@nextui-org/react";
import { columns } from "public/data/products";
// import Cards from "~/app/_components/dashboard/cards/cards";
// import { cards } from "public/data/cards";
import styles from "./product.module.css";
import { MdAdd } from "react-icons/md";
import { Button, Link } from "@nextui-org/react";
import { type IProduct } from "~/type/iProduct";
import React, { useState } from "react";
import { EditIcon } from "public/icons/EditIcon";
import { DeleteIcon } from "public/icons/DeleteIcon";
import { EyeIcon } from "public/icons/EyeIcon";
import OpenModal, { type IModal } from "~/app/_components/open_modal";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { supabase } from "~/utils/supabase";

interface TableProductProps {
  data: IProduct[]; // Menggunakan React.ReactNode untuk menangani konten dinamis
}

function TableProduct({ data }: TableProductProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const servicesDeleteProduct = api.product.delete.useMutation<IProduct>({
    onSuccess: (data) => {
      router.refresh();
      toast.success(`Berhasil Menghapus Product ${data.name}`);
    },
    onError(error) {
      toast.success(`Gagal Menghapus Product, Pesan Error : ${error.message}`);
    },
    // onSettled: async (values, error, value) => {
    //   const utils = api.useUtils();
    //   console.log("SETTLED", value);
    //   await utils.pr.getAll.invalidate();
    //   if (values) {
    //     const name = values.name;
    //     console.log("success", name);
    //   } else if (error) {
    //     // toast.error(`Error ${error.message}`);
    //     console.log("error", error);
    //   }
    // },
  });

  const renderCell = React.useCallback(
    (item: IProduct, columnKey: React.Key): React.ReactNode => {
      const cellValue = item[columnKey as keyof IProduct];

      const handleDelete = async ({
        id,
        image,
      }: {
        id: string;
        image: string;
      }) => {
        setLoading(true);
        if (id !== null && image !== null) {
          servicesDeleteProduct.mutate({ id: id });
          const { data, error } = await supabase.storage
            .from("images")
            .remove([`sayur/${image}`]);
          if (data) {
            console.log(data);
          } else if (error) {
            console.log(error);
          }
          setLoading(false);
        } else {
          setLoading(false);
          return;
        }
      };

      const modalView: IModal = {
        title: item.name,
        image: item.image,
        subTitle: item.category,
        content: item.price.toString(),
        desc: item.stock.toString(),
      };

      const modalDelete: IModal = {
        title: "Peringatan",
        content: `Apakah anda yakin ingin menghapus product "${item.name}" ??`,
      };

      switch (columnKey) {
        case "name":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: item.image,
              }}
              description={item.category}
              name={item.name}
            >
              {item.name}
            </User>
          );
        case "stock":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{item.stock} kg</p>
            </div>
          );
        case "price":
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              Rp. {item.price}
            </Chip>
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
              {loading == false && (
                <OpenModal
                  data={modalDelete}
                  isAction={true}
                  actionTitle="Hapus"
                  onAction={() => {
                    void handleDelete({ id: item.id, image: item.image });
                  }}
                  toOpen={
                    <Tooltip color="danger" content="Delete product">
                      <span className="cursor-pointer text-lg text-danger active:opacity-50">
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  }
                />
              )}
            </div>
          );
        default:
          return cellValue instanceof Date ? cellValue.toString() : cellValue;
      }
    },
    [loading, servicesDeleteProduct],
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
            <h2 className={styles.title}>Product Fresha</h2>
            <Link
              className={styles.title}
              href="/dashboard/products/addProduct"
            >
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

export default TableProduct;
