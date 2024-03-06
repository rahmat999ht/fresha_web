import { createOrder } from "~/repository/order";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { idOrderSchema, orderCreateSchema, orderUpdateSchema } from "~/type/order";

export const orderRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        product : true,
        orderBy : true,
      }
      // where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getOne: protectedProcedure.input(idOrderSchema).query(({ ctx, input }) => {
    return ctx.db.order.findUnique({
      where: idOrderSchema.parse(input),
      include: {
        product : true,
        orderBy : true,
      }
    });
  }),

  create: protectedProcedure
    .input(orderCreateSchema)
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return createOrder(input);
    }),

  update: protectedProcedure
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

  delete: protectedProcedure
    .input(idOrderSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.order.delete({
        where: idOrderSchema.parse(input),
      });
    }),
});
