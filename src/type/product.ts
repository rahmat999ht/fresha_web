// import { type IOrder } from "./order";

export interface IProduct {
  id: string;
  name: string;
  image: string;
  category: string;
  hastag_ml: string;
  desc: string;
  stock: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string | null;
  createdById: string;
  // order : IOrder;
}
