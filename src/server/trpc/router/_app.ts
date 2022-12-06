import { router } from "../trpc";
import { authRouter } from "./auth";
import { pollRouter } from "./poll";

export const appRouter = router({
  poll: pollRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
