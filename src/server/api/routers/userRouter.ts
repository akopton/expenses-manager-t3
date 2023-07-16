import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: input,
      },
    });
  }),

  getUsers: protectedProcedure.query(async ({ ctx, input }) => {
    const currentUser = ctx.session.user;
    const users = await ctx.prisma.user.findMany({
      where: {
        NOT: {
          id: currentUser.id,
        },
      },
    });
    return users;
  }),
});
