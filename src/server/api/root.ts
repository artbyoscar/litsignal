import { createTRPCRouter, createCallerFactory } from "@/server/api/trpc";
import { healthRouter } from "@/server/api/routers/health";
import { triggersRouter } from "@/server/api/routers/triggers";
import { prospectsRouter } from "@/server/api/routers/prospects";
import { campaignsRouter } from "@/server/api/routers/campaigns";
import { companiesRouter } from "@/server/api/routers/companies";
import { alertsRouter } from "@/server/api/routers/alerts";

export const appRouter = createTRPCRouter({
  health: healthRouter,
  triggers: triggersRouter,
  prospects: prospectsRouter,
  campaigns: campaignsRouter,
  companies: companiesRouter,
  alerts: alertsRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
