import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { type Bill, Prisma } from "@prisma/client";
import { type User } from "next-auth";

type BillWithProducts = Prisma.BillGetPayload<{ include: { items: true } }>;

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
            value: z.number(),
            count: z.number(),
          })
          .array(),
        added_at: z.date(),
        updated_at: z.date(),
        isPaid: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<Bill> => {
      const user: User = ctx.session.user;
      const bill: Bill = await ctx.prisma.bill.create({
        data: {
          name: input.name,
          value: input.value,
          items: {
            create: input.items.map((product, index) => ({
              name: product.name,
              product: { connect: { id: product.id } },
              value: product.value,
              count: product.count,
            })),
          },
          added_at: input.added_at,
          updated_at: input.updated_at,
          isPaid: input.isPaid,
          owner: { connect: { id: user.id } },
        },
        include: {
          items: true,
        },
      });
      return bill;
    }),

  getBills: protectedProcedure.query(async ({ ctx }): Promise<Bill[]> => {
    const bills = await ctx.prisma.bill.findMany();
    return bills;
  }),

  getBillsWithProducts: protectedProcedure.query(
    async ({ ctx }): Promise<BillWithProducts[]> => {
      const bills = await ctx.prisma.bill.findMany({
        include: { items: true },
      });
      return bills;
    }
  ),
});
