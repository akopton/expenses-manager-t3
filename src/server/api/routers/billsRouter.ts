import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { type Product, type Bill, type Prisma } from "@prisma/client";
import { type User } from "next-auth";
import { connect } from "http2";

type BillWithProducts = Prisma.BillGetPayload<{ include: { items: true } }>;

export const billsRouter = createTRPCRouter({
  addBill: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        value: z.number(),
        category: z.string(),
        items: z
          .object({
            id: z.string(),
            name: z.string(),
            value: z.number(),
            count: z.number(),
          })
          .array(),
        paymentDate: z.date(),
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
          category: {
            connectOrCreate: {
              where: {
                name: input.category,
              },
              create: {
                name: input.category,
              },
            },
          },
          value: input.value,
          items: {
            create: input.items.map((product: Product) => ({
              name: product.name,
              product: { connect: { id: product.id } },
              value: product.value,
              count: product.count,
            })),
          },
          paymentDate: input.paymentDate,
          added_at: input.added_at,
          updated_at: input.updated_at,
          isPaid: input.isPaid,
          owner: { connect: { id: user.id } },
        },
        include: {
          items: true,
        },
      });

      await ctx.prisma.category.update({
        where: { name: input.category },
        data: { value: { increment: input.value } },
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

  getBillWithId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const bill = await ctx.prisma.bill.findUnique({
        where: { id: input.id },
      });
      return bill;
    }),

  getBillsByAddedDate: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const daysDiff = Date.now() - 24 * 60 * 60 * 1000 * input;
      const daysDiffString = new Date(daysDiff).toISOString();
      const bills = await ctx.prisma.bill.findMany({
        where: {
          added_at: {
            gte: daysDiffString,
          },
        },
        orderBy: { added_at: "desc" },
        include: {
          items: true,
        },
      });
      return bills;
    }),

  getNotPaidBills: protectedProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const daysDiff = Date.now() + 24 * 60 * 60 * 1000 * input;
      const daysDiffString = new Date(daysDiff).toISOString();
      const bills = await ctx.prisma.bill.findMany({
        where: {
          isPaid: false,
          paymentDate: {
            gte: new Date(),
            lte: daysDiffString,
          },
        },
        orderBy: { paymentDate: "asc" },
        include: {
          items: true,
        },
      });
      return bills;
    }),
});
