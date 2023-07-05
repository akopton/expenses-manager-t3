import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const recordsRouter = createTRPCRouter({
  submitRecord: publicProcedure
    .input(z.object({ value: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const record = ctx.prisma.record.create({ data: { ...input } });
      return record;
    }),

  getRecords: publicProcedure.query(async ({ ctx }) => {
    const records = ctx.prisma.record.findMany();
    return records;
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
