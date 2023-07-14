import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const categoriesRouter = createTRPCRouter({
  getCategories: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const categories = await ctx.prisma.category.findMany({
      where: { owner: user },
    });
    return categories;
  }),

  getCategoriesWithBillsCount: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const categories = await ctx.prisma.category.findMany({
      where: { owner: user },
      include: { _count: true },
      orderBy: {
        updated_at: "asc",
      },
    });

    return categories;
  }),

  getCategoriesWithBills: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const categories = await ctx.prisma.category.findMany({
      where: { owner: user },
      include: { bills: true },
      orderBy: {
        updated_at: "asc",
      },
    });
    return categories;
  }),

  addCategory: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = ctx.session.user;
      const product = await ctx.prisma.category.create({
        data: { ...input, owner: { connect: { id: user.id } } },
      });
      return product;
    }),
});
