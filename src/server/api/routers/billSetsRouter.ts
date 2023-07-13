import { createTRPCRouter, protectedProcedure } from "../trpc";

export const billSetsRouter = createTRPCRouter({
  getAllSets: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const sets = await ctx.prisma.billSet.findMany({
      where: { owners: { some: user } },
      include: {
        owners: true,
      },
    });
    return sets;
  }),
});
