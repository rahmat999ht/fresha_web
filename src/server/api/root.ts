import { productRouter } from "./routers/product";
import { publicProductRouter } from "./routers/public_product";
import { publicCustomerRouter } from "./routers/public_customer";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  product : productRouter,
  public_product : publicProductRouter,
  public_customer :publicCustomerRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
