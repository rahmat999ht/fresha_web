import { z } from "zod";
import type { Prisma, Order } from "@prisma/client";

export type FindManyCustomerProps = Prisma.CustamerFindManyArgs;
export type FindFirstCustomerProps = Prisma.CustamerFindFirstArgs;
export type UpdateCustomerProps = z.infer<typeof customerSchema>;

export const idCustomerSchema = z.object({ id: z.string() });

export const customerUpdateSchema = z.object({
  id: z.string().cuid(),
  isActive: z.boolean(), // Added this line
});

export const customerSchema = z.object({
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
