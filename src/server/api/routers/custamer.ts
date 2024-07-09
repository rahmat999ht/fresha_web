import { createCustamer } from "~/repository/costumer";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { customerSchema, customerUpdateSchema, idCustomerSchema } from "~/type/customer";

export const custamerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.custamer.findMany({
      include: {
        riwPes: true,
      },
    });
  }),

  getOne: protectedProcedure.input(idCustomerSchema).query(({ ctx, input }) => {
    return ctx.db.custamer.findUnique({
      where: idCustomerSchema.parse(input),
      include: { riwPes: true },
    });
  }),

  create: protectedProcedure
    .input(customerSchema)
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return createCustamer(input);
    }),

  update: protectedProcedure
    .input(customerUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.custamer.update({
        where: idCustomerSchema.parse(input),
        data: {
          id: input.id,
          isActive: input.isActive,
        },
      });
    }),

  delete: protectedProcedure
    .input(idCustomerSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.custamer.delete({
        where: idCustomerSchema.parse(input),
      });
    }),
});
