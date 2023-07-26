import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const shoppingListsRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const lists = await ctx.prisma.shoppingList.findMany();
    return lists;
  }),

  getNamesAndIds: protectedProcedure.query(async ({ ctx }) => {
    const user = ctx.session.user;
    const lists = await ctx.prisma.shoppingList.findMany({
      select: { id: true, name: true },
      where: {
        owners: { some: { id: user.id } },
      },
    });
    return lists;
  }),

  getOneWithId: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const list = await ctx.prisma.shoppingList.findUnique({
        where: { id: input.id },
        include: { owners: true, products: true },
      });
      return list;
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

  updateWithId: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        products: z.object({ name: z.string(), count: z.number() }).array(),
        users: z.object({ id: z.string() }).array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currentUser = ctx.session.user;
      const currentList = await ctx.prisma.shoppingList.findUnique({
        where: { id: input.id },
        include: {
          products: true,
          owners: { where: { NOT: { id: currentUser.id } } },
        },
      });

      if (currentList) {
        if (input.name !== currentList.name) {
          await ctx.prisma.shoppingList.update({
            where: { id: input.id },
            data: { name: input.name },
          });
        }

        if (currentList.products.length < input.products.length) {
          input.products.map(async (product) => {
            const found = await ctx.prisma.shoppingListProduct.findUnique({
              where: {
                name_shoppingListId: {
                  name: product.name,
                  shoppingListId: input.id,
                },
              },
            });

            if (!found) {
              await ctx.prisma.shoppingList.update({
                where: { id: input.id },
                data: {
                  products: {
                    create: { name: product.name, count: product.count },
                  },
                },
              });
            }
          });
        }

        if (currentList.products.length > input.products.length) {
          input.products.map(async (product) => {
            const found = currentList.products.filter(
              (el) => !input.products.some((item) => el.name === item.name)
            );

            if (found[0]) {
              await ctx.prisma.shoppingList.update({
                where: { id: input.id },
                data: {
                  products: {
                    delete: {
                      name_shoppingListId: {
                        name: found[0].name,
                        shoppingListId: input.id,
                      },
                    },
                  },
                },
              });
            }
          });
        }

        if (currentList.owners.length < input.users.length) {
          input.users.map(async (user) => {
            await ctx.prisma.shoppingList.update({
              where: { id: input.id },
              data: {
                owners: {
                  connect: {
                    id: user.id,
                  },
                },
              },
            });
          });
        }

        input.products.map(async (product) => {
          await ctx.prisma.shoppingListProduct.update({
            where: {
              name_shoppingListId: {
                name: product.name,
                shoppingListId: input.id,
              },
            },
            data: { name: product.name, count: product.count },
          });
        });
      }
    }),
});
