import { Button, Pagination } from "@nextui-org/react";
import { ChevronIcon } from "public/icons/ChevronIcon";
import React from "react";

type Props = {
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PaginationCustom = (props: Props) => {
  return (
    <div className="flex w-full flex-auto items-center justify-center gap-2">
      <Button
        size="sm"
        variant="flat"
        color={props.page == 1 ? "danger" : "success"}
        disabled={props.page == 1 ? true : false}
        onPress={() => props.setPage((prev) => (prev > 1 ? prev - 1 : prev))}
      >
        <ChevronIcon />
      </Button>
      <Pagination
        total={props.pages}
        color="success"
        page={props.page}
        onChange={props.setPage}
      />
      <Button
        size="sm"
        variant="flat"
        color={props.page == props.pages ? "danger" : "success"}
        disabled={props.page == props.pages ? true : false}
        onPress={() =>
          props.setPage((prev) => (prev < props.pages ? prev + 1 : prev))
        }
      >
        <ChevronIcon className="rotate-180" />
      </Button>
    </div>
  );
};
