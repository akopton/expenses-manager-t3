import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const productsRouter = createTRPCRouter({
  addProduct: publicProcedure
    .input(
      z.object({
        name: z.string(),
        value: z.number(),
        count: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const product = await ctx.prisma.product.create({
        data: { ...input },
      });
      return product;
    }),

  getProducts: protectedProcedure.query(async ({ ctx }) => {
    const products = await ctx.prisma.product.findMany();
    return products;
  }),
});
