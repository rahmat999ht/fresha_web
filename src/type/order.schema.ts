import { z } from "zod";

export const idOrderSchema = z.object({ id: z.string() });

export const orderUpdateSchema = z.object({
  id: z.string().cuid(),
  status: z.string().min(0, "status harus diisi"),
});

export const orderCreateSchema = z.object({
  status: z.string().min(0, "status harus diisi"),
  totPrice: z.number().min(1, "totPrice harus diisi"),
  amount: z.number().min(1, "amount harus diisi"),
  productId: z.string(),
  orderById: z.string(),
});
