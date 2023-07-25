import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const shoppingListsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
  }),

  getNamesAndIds: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
  }),

  addNew: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        products: z.object({ name: z.string(), count: z.number() }).array(),
        users: z.object({ id: z.string() }).array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = ctx.session.user;
      const owners = input.users;
      owners.push(user);

      const list = await ctx.prisma.shoppingList.create({
        data: {
          name: input.name,
          products: {
            create: input.products.map((product) => ({
              name: product.name,
              count: product.count,
            })),
          },
          owners: {
            connect: owners.map((user) => {
              return { id: user.id };
            }),
          },
        },
      });
      return list;
    }),
});
