"use client";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const idOrderSchema = z.object({ id: z.string() });

export const orderSchema = z.object({
  status: z.string().min(0, "status harus diisi"),
  totPrice: z.number().min(1, "totPrice harus diisi"),
  amount: z.number().min(1, "amount harus diisi"),
  productId: z.string(),
  orderById: z.string(),
});

export const orderUpdateSchema = z.object({
  id: z.string().cuid(),
  status: z.string().min(0, "status harus diisi"),
});

export const orderRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.order.findMany({
      orderBy: { createdAt: "desc" },
      // where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getOne: publicProcedure.input(idOrderSchema).query(({ ctx, input }) => {
    return ctx.db.order.findUnique({
      where: idOrderSchema.parse(input),
    });
  }),

  create: publicProcedure
    .input(orderSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.order.create({
        data: {
          status: input.status,
          totPrice: input.totPrice,
          amount: input.amount,
          product: { connect: { id: input.productId } },
          orderBy: { connect: { id: input.orderById } },
        },
      });
    }),

  update: publicProcedure
    .input(orderUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.order.update({
        where: idOrderSchema.parse(input),
        data: {
          id: input.id,
          status: input.status,
        },
      });
    }),

  delete: publicProcedure
    .input(idOrderSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.order.delete({
        where: idOrderSchema.parse(input),
      });
    }),
});
