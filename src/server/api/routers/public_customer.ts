import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idProductSchema = z.object({ id: z.string() });

export const publicCustomerRouter = createTRPCRouter({
  getOne: publicProcedure.input(idProductSchema).query(({ ctx, input }) => {
    return ctx.db.user.findUnique({
      where: idProductSchema.parse(input),
    });
  }),
});
