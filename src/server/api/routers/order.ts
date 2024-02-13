"use client";

import { createOrder } from "~/repository/order";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { idOrderSchema, orderCreateSchema, orderUpdateSchema } from "~/type/order.schema";

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
    .input(orderCreateSchema)
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return createOrder(input);
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
