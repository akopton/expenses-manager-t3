import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

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

  getSetById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const set = await ctx.prisma.billSet.findUnique({
        where: { id: input.id },
        include: {
          owners: true,
          _count: true,
          bills: { include: { owner: true, items: true } },
        },
      });
      return set;
    }),

  getLastUpdated: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const sets = await ctx.prisma.billSet.findMany({
      where: { owners: { some: user }, NOT: { updated_at: null } },
      orderBy: { updated_at: "desc" },
      include: { owners: true, _count: true },
      take: 6,
    });
    return sets;
  }),

  addNewSet: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const set = await ctx.prisma.billSet.create({
        data: {
          name: input.name,
          value: 0,
          createdById: user.id,
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
        users: z.object({ id: z.string() }).array().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const newSet = await ctx.prisma.billSet.create({
        data: {
          name: input.name,
          value: 0,
          owners: { connect: { id: user.id } },
          createdById: user.id,
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
            updatedById: user.id,
            updated_at: new Date(),
          },
        });
      }

      if (input.users) {
        await ctx.prisma.billSet.update({
          where: { id: newSet.id },
          data: {
            owners: {
              connect: input.users.map((user) => ({ id: user.id })),
            },
            updatedById: user.id,
            updated_at: new Date(),
          },
        });
      }

      const sets = await ctx.prisma.billSet.findMany({
        where: { owners: { some: user } },
        orderBy: { added_at: "desc" },
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
