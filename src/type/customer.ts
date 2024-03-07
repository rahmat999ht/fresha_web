import { z } from "zod";
import type { Prisma,  Order } from "@prisma/client";

export type FindManyCustomerProps = Prisma.CustamerFindManyArgs;
export type FindFirstCustomerProps = Prisma.CustamerFindFirstArgs;
export type UpdateCustomerProps = z.infer<typeof custamerSchema>;

export const idCustamerSchema = z.object({ id: z.string() });

export const custamerUpdateSchema = z.object({
  id: z.string().cuid(),
  isActive: z.boolean(),
});

export const custamerSchema = z.object({
  id: z.string(),
  name: z.string().min(0, "name harus diisi"),
  email: z.string().email(),
  phone: z.string().min(1, "phone harus diisi"),
  address: z.string(),
  image: z.string(),
});

export interface ICustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
  isActive: boolean;
  riwPes: Order[];
}
