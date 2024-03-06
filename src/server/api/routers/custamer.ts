import { createCustamer } from "~/repository/costumer";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { custamerSchema, custamerUpdateSchema, idCustamerSchema } from "~/type/customer";

export const custamerRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.custamer.findMany({
      include: {
        riwPes: true,
      },
    });
  }),

  getOne: protectedProcedure.input(idCustamerSchema).query(({ ctx, input }) => {
    return ctx.db.custamer.findUnique({
      where: idCustamerSchema.parse(input),
      include: { riwPes: true },
    });
  }),

  create: protectedProcedure
    .input(custamerSchema)
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return createCustamer(input);
    }),

  update: protectedProcedure
    .input(custamerUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.custamer.update({
        where: idCustamerSchema.parse(input),
        data: {
          id: input.id,
          isActive: input.isActive,
        },
      });
    }),

  delete: protectedProcedure
    .input(idCustamerSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.custamer.delete({
        where: idCustamerSchema.parse(input),
      });
    }),
});
