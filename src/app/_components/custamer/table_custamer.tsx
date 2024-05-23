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
} from "@nextui-org/react";
import { columns } from "public/data/users";
import React from "react";
import OpenModal, { type IModal } from "../open_modal";
import { EyeIcon } from "public/icons/EyeIcon";
import { EditIcon } from "public/icons/EditIcon";
import { type ICustomer } from "~/type/customer";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

interface TableCustamerProps {
  data: ICustomer[]; // Menggunakan React.ReactNode untuk menangani konten dinamis
  bottomContent: React.ReactNode;
}

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

function TableCustamer({ data, bottomContent }: TableCustamerProps) {
  const router = useRouter();
  // const [activate, setActivate] = useState(false);
  // const [uploading, setUploading] = useState(false);

  const updateActivate = api.custamer.update.useMutation({
    onSuccess: () => {
      router.refresh();
      // setActivate(false);
    },
  });

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

      const handleActivate = async () => {
        // setUploading(true);
        updateActivate.mutate({
          id: item.id,
          isActive: !item.isActive,
        });
        console.log("berhasil guys");
        console.log("berhasil guys");
        // setUploading(false);
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
                  <Tooltip content="Details Customer">
                    <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                      <EyeIcon />
                    </span>
                  </Tooltip>
                }
              />
              <OpenModal
                data={modalView}
                isAction={true}
                actionTitle={
                  item.isActive ? "DeActive Customer" : "Activate Customer"
                }
                onAction={handleActivate}
                toOpen={
                  <Tooltip
                    content={
                      item.isActive ? "DeActive Customer" : "Activate Customer"
                    }
                  >
                    <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>
                }
              />
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
    [updateActivate],
  );

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={bottomContent}
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
  );
}

export default TableCustamer;
