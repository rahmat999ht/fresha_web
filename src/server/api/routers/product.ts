import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

const idProductSchema = z.object({ id: z.string() });

const productSchema = z.object({
  name: z.string().min(1),
  image: z.string().min(1),
  hastag_ml: z.string().min(1),
  category: z.string().min(1),
  desc: z.string().min(1),
  price: z.number().min(1),
  stock: z.number().min(1),
});

const productUpdateSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1),
  image: z.string().min(1),
  hastag_ml: z.string().min(1),
  category: z.string().min(1),
  desc: z.string().min(1),
  price: z.number().min(1),
  stock: z.number().min(1),
});

export const productRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getOne: protectedProcedure.input(idProductSchema).query(({ ctx, input }) => {
    return ctx.db.product.findUnique({
      where: idProductSchema.parse(input),
    });
  }),

  create: protectedProcedure
    .input(productSchema)
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.product.create({
        // data : productSchema.parse(input),
        data: {
          name: input.name,
          image: input.image,
          category: input.category,
          hastag_ml: input.hastag_ml,
          desc: input.desc,
          price: input.price,
          stock: input.stock,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  update: protectedProcedure
    .input(productUpdateSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return ctx.db.product.update({
        where: idProductSchema.parse(input),
        data: productUpdateSchema.parse(input),
      });
    }),

  delete: protectedProcedure
    .input(idProductSchema)
    .mutation(async ({ ctx, input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // useMutation({
      //   onSettled(data, error, variables, context) {},
      //   onError(error, variables, context) {},
      //   onSuccess(data, variables, context) {},
      // });
      return ctx.db.product.delete({
        where: idProductSchema.parse(input),
      });
    }),
});
