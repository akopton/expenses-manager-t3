import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const categoriesRouter = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany();
    return categories;
  }),

  getCategoriesWithBillsCount: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      include: { _count: true },
      orderBy: {
        updated_at: "asc",
      },
    });

    return categories;
  }),

  getCategoriesWithBills: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      include: { bills: true },
      orderBy: {
        updated_at: "asc",
      },
    });
    return categories;
  }),

  addCategory: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const product = await ctx.prisma.category.create({
        data: { ...input },
      });
      return product;
    }),
});
