"use client"

import React from "react";
import { type ICustomer } from "~/type/customer";
import Cards from "../dashboard/cards/cards";

type Props = {
  data: ICustomer[];
};

const CardHeaderCustamer = (props: Props) => {
  const userActive = props.data.filter((item) => item.isActive == true);
  const userNonActive = props.data.filter((item) => item.isActive == false);

  const cardsHeader = [
    {
      id: 1,
      title: "Total Users",
      number: props.data.length,
    },
    {
      id: 2,
      title: "Active",
      number: userActive.length,
    },
    {
      id: 3,
      title: "Non-Active",
      number: userNonActive.length,
    },
  ];
  return (
    <div className=" grid grid-cols-2 flex-wrap gap-x-4 sm:grid-cols-4">
      {cardsHeader.map((item) => (
        <Cards item={item} key={item.id} />
      ))}
    </div>
  );
};

export default CardHeaderCustamer;