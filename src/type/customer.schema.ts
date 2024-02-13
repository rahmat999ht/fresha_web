import { z } from "zod";

export const idCustamerSchema = z.object({ id: z.string() });

export const custamerSchema = z.object({
  name: z.string().min(0, "name harus diisi"),
  email: z.string().email(),
  phone: z.string().min(1, "phone harus diisi"),
  address: z.string(),
  image: z.string(),
});


