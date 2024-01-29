import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idProductSchema = z.object({ id: z.string() });

export const publicProductRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      orderBy: { createdAt: "desc" },
    //   where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
  getOne: publicProcedure.input(idProductSchema).query(({ ctx, input }) => {
    return ctx.db.product.findUnique({
      where: idProductSchema.parse(input),
    });
  }),
});
