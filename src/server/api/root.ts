import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/userRouter";
import { productsRouter } from "./routers/productsRouter";
import { billsRouter } from "./routers/billsRouter";
import { categoriesRouter } from "./routers/categoriesRouter";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  users: userRouter,
  products: productsRouter,
  bills: billsRouter,
  categories: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
