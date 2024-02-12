
import {  z } from "zod";

export type TCreateOrderProps = z.infer<typeof createOrderSchema>;

export const createOrderSchema = z.object({
    status: z.string().min(3, "Nama minimal 3 karakter").min(0, "Nama harus diisi"),
    totPrice: z.number().min(1, "Price harus diisi"),
    productId: z.string(),
    orderById: z.string(),
  });
  
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNsc2VyYjNxNTAwMDAxMW5iNDliODA4NmMiLCJuYW1lIjpudWxsLCJlbWFpbCI6InJhaG1hdDk5OWhyQGdtYWlsLmNvbSIsInBob25lIjpudWxsLCJhZGRyZXNzIjpudWxsLCJlbWFpbFZlcmlmaWVkIjpudWxsLCJpbWFnZSI6bnVsbCwiaWF0IjoxNzA3Njc3MTkyLCJleHAiOjE3MDc5MzYzOTJ9.4EszUHFVsQvViDz24xObruwy1rnkTQWRvkpKmSwz9Lk
   