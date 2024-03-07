"use client"

import React from "react";
import Cards from "../dashboard/cards/cards";
import { type IProduct } from "~/type/product";

type Props = {
  data: IProduct[];
};

const CardHeaderProduct = (props: Props) => {
  const productReady = props.data.filter((item) => item.stock != 0);
  const productEmpty = props.data.filter((item) => item.stock == 0);
  // const userNonActive = props.data.filter((item) => item.isActive == false);

  const cardsHeader = [
    {
      id: 1,
      title: "Total Product",
      number: props.data.length,
    },
    {
      id: 2,
      title: "Ready",
      number: productReady.length,
    },
    {
      id: 3,
      title: "Empty",
      number: productEmpty.length,
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

export default CardHeaderProduct;