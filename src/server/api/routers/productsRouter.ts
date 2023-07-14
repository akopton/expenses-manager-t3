import { TRPCError } from "@trpc/server";
import { error } from "console";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  addProductAndReturnAll: protectedProcedure
    .input(z.object({ name: z.string(), value: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      await ctx.prisma.product.create({
        data: { ...input, owner: { connect: { id: user.id } } },
      });

      const products = await ctx.prisma.product.findMany({
        where: { owner: user },
      });
      return products;
    }),

  addProduct: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        value: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const product = await ctx.prisma.product.create({
        data: { ...input, owner: { connect: { id: user.id } } },
      });
      return product;
    }),

  getProducts: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const products = await ctx.prisma.product.findMany({
      where: { owner: user },
    });
    return products;
  }),
});
