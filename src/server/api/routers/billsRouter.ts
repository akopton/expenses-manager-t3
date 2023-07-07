import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import type { Bill, Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export const billsRouter = createTRPCRouter({
  addBill: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        value: z.number(),
        items: z
          .object({
            id: z.string(),
            name: z.string(),
            value: z.instanceof(Decimal),
            count: z.number(),
          })
          .array(),
        added_at: z.date(),
        updated_at: z.date(),
        isPaid: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const itemsIds = input.items.map((item) => {
        return item.id;
      });
      const bill: Bill = await ctx.prisma.bill.create({
        data: {
          name: input.name,
          value: input.value,
          items: {
            connect: itemsIds.map((id: string) => ({
              id: id,
            })),
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
