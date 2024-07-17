"use client";

import React from "react";
import Cards from "../dashboard/cards/cards";
import { type IOrder } from "~/type/order";

type Props = {
  data: IOrder[];
};

const CardHeaderTransaction = (props: Props) => {
  const orderDone = props.data.filter((item) => item.status == "done");
  const orderProcessed = props.data.filter(
    (item) => item.status == "processed",
  );
  const orderPending = props.data.filter((item) => item.status == "pending");

  const cardsHeader = [
    {
      id: 1,
      title: "Total Transaction",
      number: props.data.length,
    },
    {
      id: 2,
      title: "Done",
      number: orderDone.length,
    },
    {
      id: 3,
      title: "Processed",
      number: orderProcessed.length,
    },
    // {
    //   id: 4,
    //   title: "Pending",
    //   number: orderPending.length,
    // },
  ];
  return (
    <div className="grid grid-cols-3 flex-wrap gap-x-4 sm:flex-wrap">
      {cardsHeader.map((item) => (
        <Cards item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CardHeaderTransaction;
