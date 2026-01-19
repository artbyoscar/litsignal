import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";

export const healthRouter = createTRPCRouter({
  ping: publicProcedure.query(() => {
    return {
      status: "ok",
      timestamp: new Date(),
      message: "LitSignal API is running",
    };
  }),

  protectedPing: protectedProcedure.query(({ ctx }) => {
    return {
      status: "ok",
      timestamp: new Date(),
      userId: ctx.userId,
      message: "Authenticated successfully",
    };
  }),

  echo: publicProcedure
    .input(z.object({ message: z.string() }))
    .query(({ input }) => {
      return {
        received: input.message,
        echoed: `LitSignal says: ${input.message}`,
        timestamp: new Date(),
      };
    }),
});
