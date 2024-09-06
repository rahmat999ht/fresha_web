import React from "react";
import { IProduct } from "~/type/product";
import { getAllCustomer, getAllOrder, getAllProduct } from "~/services/admin.service";
import ViewDashboard from "./view";
import { ICustomer } from "~/type/customer";
import { IOrder } from "~/type/order";

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
