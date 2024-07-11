"use client";

import { type ICustomer } from "~/type/customer";
import CardHeaderCustamer from "~/app/_components/custamer/header_data";

import { api } from "~/trpc/react";
import { columns, statusOptions } from "public/data/users";
import { useRouter } from "next/navigation";
import React from "react";

import { EyeIcon } from "public/icons/EyeIcon";
import { EditIcon } from "public/icons/EditIcon";

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
  SortDescriptor,
  Input,
  Dropdown,
  Button,
  Pagination,
  DropdownMenu,
  DropdownItem,
  DropdownTrigger,
} from "@nextui-org/react";
import OpenModal, { IModal } from "~/app/_components/open_modal";
import toast from "react-hot-toast";
import { SearchIcon } from "public/icons/SearchIcon";
import { capitalize } from "~/utils/capitalize";
import { ChevronDownIcon } from "public/icons/ChevronDownIcon";

type Props = {
  data: Promise<ICustomer[]>;
};

const statusColorMap: Record<string, ChipProps["color"]> = {
  true: "success",
  false: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "phone",
  "status",
  "address",
  "actions",
];

const CustamerView = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // const [isServer, setServer] = React.useState(false);
  const [originalData, setOriginalData] = React.useState<ICustomer[]>([]);

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "phone",
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
        user.email!.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) => {
        var value: string;
        if (user.isActive == true) {
          value = "Active";
        } else {
          value = "non Active";
        }
        return Array.from(statusFilter).includes(value);
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
    return [...items].sort((a: ICustomer, b: ICustomer) => {
      const first = a[sortDescriptor.column as keyof ICustomer];
      const second = b[sortDescriptor.column as keyof ICustomer];
      let cmp = 0;

      if (typeof first === 'number' && typeof second === 'number') {
        cmp = first - second;
      } else if (typeof first === 'string' && typeof second === 'string') {
        cmp = first.localeCompare(second);
      } else if (typeof first === 'boolean' && typeof second === 'boolean') {
        cmp = first ? (second ? 0 : 1) : (second ? -1 : 0);
      }

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


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
        title: "Info Custamer",
        image: item.image,
        subTitle: item.name ? "Nama :  " + item.name : "Nama :  " + item.email,
        content: item.isActive
          ? "Status :  " + "Active"
          : "Status :  " + "non Active",
        desc: "No.HP :  " + item.phone,
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
        <CardHeaderCustamer data={originalData} />
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
            <Dropdown>
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
            </Dropdown>
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
    originalData.length,
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

export default CustamerView;
