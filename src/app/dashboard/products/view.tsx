"use client";

import {
  Button,
  // Dropdown,
  // DropdownItem,
  // DropdownMenu,
  // DropdownTrigger,
  Input,
  type SortDescriptor,
  Table,
  User,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Tooltip,
  Chip,
} from "@nextui-org/react";

import { type IProduct } from "~/type/product";
import { SearchIcon } from "public/icons/SearchIcon";
// import { ChevronDownIcon } from "public/icons/ChevronDownIcon";
// import { capitalize } from "~/utils/capitalize";
import { PlusIcon } from "public/icons/PlusIcon";
// import { VerticalDotsIcon } from "public/icons/VerticalDotsIcon";
import { columns } from "public/data/products";
import React from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { supabase } from "~/utils/supabase";
import OpenModal, { type IModal } from "~/app/_components/open_modal";
import { DeleteIcon } from "public/icons/DeleteIcon";
import { EditIcon } from "public/icons/EditIcon";
import { EyeIcon } from "public/icons/EyeIcon";
import Link from "next/link";
import CardHeaderProduct from "~/app/_components/product/header_data";

type Props = {
  data: Promise<IProduct[]>;
};

const INITIAL_VISIBLE_COLUMNS = ["name", "stock", "price", "actions"];

const ProducVtiew = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // const [isServer, setServer] = React.useState(false);
  const [originalData, setOriginalData] = React.useState<IProduct[]>([]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns,] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  // const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const handleDataCustamer = async () => {
    setLoading(true);
    try {
      const initData = await props.data;
      setOriginalData(initData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    void handleDataCustamer();
  });

  const hasSearchFilter = Boolean(filterValue);
  const headerColumns = React.useMemo(() => {
    if (visibleColumns.has("all")) return columns;

    return columns.filter((column) => visibleColumns.has(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = originalData;

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    // if (
    //   statusFilter !== "all" &&
    //   Array.from(statusFilter).length !== stockOptions.length
    // ) {
    //   filteredUsers = filteredUsers.filter((user) => {
    //     let value: string;
    //     if (user.stock == 0) {
    //       value = "tidak tersedia";
    //     } else {
    //       value = "tersedia";
    //     }
    //     return Array.from(statusFilter).includes(value);
    //   });
    // }

    return filteredUsers;
  }, [originalData, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: IProduct, b: IProduct) => {
      const first = a[sortDescriptor.column as keyof IProduct] as number;
      const second = b[sortDescriptor.column as keyof IProduct] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const servicesDeleteProduct = api.product.delete.useMutation<IProduct>({
    onSuccess: (data) => {
      router.refresh();
      toast.success(`Berhasil Menghapus Product ${data.name}`);
    },
    onError(error) {
      toast.success(`Gagal Menghapus Product, Pesan Error : ${error.message}`);
    },
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
        title: "Detail Product",
        image: item.image,
        subTitle: "Nama Sayur :  " + item.category,
        content: "Harga Sayur :  " + item.price.toString(),
        desc: "Stock :  " + item.stock.toString(),
      };

      const modalDelete: IModal = {
        title: "Peringatan",
        content: `Apakah anda yakin ingin menghapus product "${item.name}" ??`,
      };

      // const handleEditClick = () => {
      //   router.push(`/dashboard/products/${item.id}`);
      // };

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
        case "category":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">{item.category}</p>
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
              <Link href={`/dashboard/products/${item.id}`} passHref>
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
          if (Array.isArray(cellValue)) {
            return cellValue.map((item) => (
              <div key={item.productId}>{item.productId}</div>
            ));
          }
          return cellValue instanceof Date ? cellValue.toString() : cellValue;
      }
    },
    [loading, servicesDeleteProduct],
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <CardHeaderProduct data={originalData} />
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={(keys) =>
                  setStatusFilter(Array.isArray(keys) ? keys.join(",") : "")
                }
              >
                {stockOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={Array.from(visibleColumns)}
                selectionMode="multiple"
                onSelectionChange={() => setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem
                    key={column.uid.toString()}
                    className="capitalize"
                  >
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Button
              color="success"
              endContent={<PlusIcon />}
              onClick={() => router.push("/dashboard/products/addProduct")}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {originalData.length} product
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    // visibleColumns,
    originalData,
    onRowsPerPageChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys.size === filteredItems.length
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys.size,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={() => setSelectedKeys}
      onSortChange={(sort) => setSortDescriptor(sort)}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No Product found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ProducVtiew;
