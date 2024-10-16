import React from "react";
import { type IProduct } from "~/type/product";
import { getAllCustomer, getAllOrder, getAllProduct } from "~/services/admin.service";
import ViewDashboard from "./view";
import { type ICustomer } from "~/type/customer";
import { type IOrder } from "~/type/order";

const Dashboard: React.FC = () => {
  const dataProduct: Promise<IProduct[]> = getAllProduct();
  const dataOrder: Promise<IOrder[]> = getAllOrder();
  const dataCustomer: Promise<ICustomer[]> = getAllCustomer();


  return (
    <ViewDashboard products={dataProduct} orders={dataOrder} customers={dataCustomer}>
    </ViewDashboard>
  );
};

export default Dashboard;
