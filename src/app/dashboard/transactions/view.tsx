"use client";

import {
  Button,
  Chip,
  type ChipProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  type SortDescriptor,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  User,
} from "@nextui-org/react";
import React from "react";
import { type IOrder } from "~/type/order";
import CardHeaderTransaction from "~/app/_components/transaction/header_data";
import { columns, statusOptions } from "public/data/transactions";
import OpenModal, { type IModal } from "~/app/_components/open_modal";
import { EyeIcon } from "public/icons/EyeIcon";
import { SearchIcon } from "public/icons/SearchIcon";
import { ChevronDownIcon } from "public/icons/ChevronDownIcon";
import { capitalize } from "~/utils/capitalize";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { EditIcon } from "public/icons/EditIcon";

type Props = {
  data: Promise<IOrder[]>;
};

const statusColorMap: Record<string, ChipProps["color"]> = {
  done: "success",
  processed: "warning",
  pending: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "customer",
  "status",
  "totBuy",
  "totPro",
  "actions",
];

const TransactionView = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // const [isServer, setServer] = React.useState(false);
  const [originalData, setOriginalData] = React.useState<IOrder[]>([]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "totPro",
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
        user.orderBy.email!.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) => {
        return Array.from(statusFilter).includes(user.status);
      });
    }

    return filteredUsers;
  }, [originalData, filterValue, hasSearchFilter, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: IOrder, b: IOrder) => {
      const first = a[sortDescriptor.column as keyof IOrder] as number;
      const second = b[sortDescriptor.column as keyof IOrder] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const updateStatus = api.order.update.useMutation({
    onSuccess: () => {
      router.refresh();
      // setActivate(false);
    },
  });

  const renderCell = React.useCallback(
    (item: IOrder, columnKey: React.Key): React.ReactNode => {
      const cellValue = item[columnKey as keyof IOrder];
      const modalView: IModal = {
        title: "Detail Transaction",
        image: item.orderBy.image!,
        subTitle: "Nama Pemesan :  " + item.orderBy.name,
        content: "Status :  " + item.status,
        desc: "Total Harga :  " + item.totBuy.toString(),
      };

      const handleStatus = async (status: string) => {
        setLoading(true);
        updateStatus.mutate({
          id: item.id,
          status: status,
        });
        console.log("berhasil guys");
        console.log("berhasil guys");
        setLoading(false);
      };

      switch (columnKey) {
        case "customer":
          return (
            <User
              avatarProps={{
                radius: "lg",
                src: item.orderBy.image?.toString(),
              }}
              description={item.orderBy.email}
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
        case "totBuy":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {"Rp. " + item.totBuy}
              </p>
            </div>
          );

        case "totPro":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm capitalize">
                {item.listProduct.length}
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

              {loading == false && (
                <OpenModal
                  data={modalView}
                  isAction={true}
                  actionTitle={
                    item.status == "done"
                      ? "Pesanan Selesai"
                      : "Selesaikan Pesanan"
                  }
                  onAction={() => handleStatus("done")}
                  toOpen={
                    <Tooltip
                      content={
                        item.status == "done"
                          ? "Pesanan Selesai"
                          : "Selesaikan Pesanan"
                      }
                    >
                      <span className="cursor-pointer text-lg text-default-400 active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                  }
                />
              )}
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
    [loading, updateStatus],
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
        <CardHeaderTransaction data={originalData} />
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
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
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
            {/* <Button color="success" endContent={<PlusIcon />}>
              Add New
            </Button> */}
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
    statusFilter,
    visibleColumns,
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

export default TransactionView;
