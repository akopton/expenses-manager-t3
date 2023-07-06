import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const billsRouter = createTRPCRouter({
  addBill: publicProcedure
    .input(z.object({ value: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const record = ctx.prisma.record.create({ data: { ...input } });
      return record;
    }),

  getBills: protectedProcedure.query(({ ctx }) => {
    const bills = ctx.prisma.bill.findMany();
    return bills;
  }),
});
