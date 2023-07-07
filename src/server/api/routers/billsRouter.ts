import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { Product } from "@prisma/client";

export const billsRouter = createTRPCRouter({
  addBill: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        value: z.number(),
        items: z.any(),
        added_at: z.date(),
        updated_at: z.date(),
        isPaid: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const bill = await ctx.prisma.bill.create({
        data: {
          name: input.name,
          value: input.value,
          items: {
            connect: input.items.map((item: Product) => ({ id: item.id })),
          },
          added_at: input.added_at,
          updated_at: input.updated_at,
          isPaid: input.isPaid,
          owner: { connect: { id: user.id } },
        },
      });

      return bill;
    }),
  getBills: protectedProcedure.query(async ({ ctx }) => {
    const bills = await ctx.prisma.bill.findMany();
    console.log(bills);

    return bills;
  }),
});
