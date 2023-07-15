import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { connect } from "http2";
import { billsRouter } from "./billsRouter";

export const billSetsRouter = createTRPCRouter({
  getAllSets: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const sets = await ctx.prisma.billSet.findMany({
      where: { owners: { some: user } },
      orderBy: { added_at: "desc" },
      include: { owners: true, _count: true },
    });
    return sets;
  }),

  addNewSet: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const set = await ctx.prisma.billSet.create({
        data: {
          name: input.name,
          value: 0,
        },
      });
      return set;
    }),

  addNewSetReturnAll: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        bills: z
          .object({
            id: z.string(),
            value: z.number(),
            added_at: z.date(),
            updated_at: z.date(),
            paymentDate: z.date(),
            isPaid: z.boolean(),
          })
          .array()
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const newSet = await ctx.prisma.billSet.create({
        data: {
          name: input.name,
          value: 0,
          owners: { connect: { id: user.id } },
        },
      });

      if (input.bills) {
        await ctx.prisma.billSet.update({
          where: { id: newSet.id },
          data: {
            value: {
              increment: input.bills.reduce((acc, curr) => acc + curr.value, 0),
            },
            bills: { connect: input.bills.map((el) => ({ id: el.id })) },
          },
        });
      }

      const sets = await ctx.prisma.billSet.findMany({
        include: { owners: true, _count: true },
      });
      return sets;
    }),

  addBillsToSet: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        bills: z
          .object({
            id: z.string(),
            value: z.number(),
            added_at: z.date(),
            updated_at: z.date(),
            paymentDate: z.date(),
            isPaid: z.boolean(),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const set = await ctx.prisma.billSet.update({
        where: { id: input.id },
        data: {
          bills: {
            connect: input.bills.map((el) => ({ id: el.id })),
          },
        },
      });

      return set;
    }),
});

// name        String
//     items       BillItem[]
//     value       Float
//     added_at    DateTime
//     updated_at  DateTime
//     paymentDate DateTime
//     isPaid      Boolean
//     paid_at     DateTime?
//     categoryId  String
