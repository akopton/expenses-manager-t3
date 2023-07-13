import { createTRPCRouter, protectedProcedure } from "../trpc";

export const billItemsRouter = createTRPCRouter({
  getBillItems: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const billItems = await ctx.prisma.billItem.groupBy({
      by: ["name"],
      _count: true,
      orderBy: {
        _count: {
          count: "desc",
        },
      },
      where: {
        bill: {
          owner: user,
        },
      },
    });
    return billItems;
  }),
});
