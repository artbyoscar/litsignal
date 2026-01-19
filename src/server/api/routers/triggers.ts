import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { TriggerStatus, CaseCategory, InsuranceLine } from "@prisma/client";

export const triggersRouter = createTRPCRouter({
  // Get all triggers for the organization
  list: protectedProcedure
    .input(
      z.object({
        status: z.nativeEnum(TriggerStatus).optional(),
        category: z.nativeEnum(CaseCategory).optional(),
        insuranceLine: z.nativeEnum(InsuranceLine).optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const triggers = await ctx.db.trigger.findMany({
        where: {
          ...(input.status && { status: input.status }),
          ...(input.category && { caseCategory: input.category }),
          ...(input.insuranceLine && {
            insuranceLines: { has: input.insuranceLine },
          }),
          ...(input.search && {
            OR: [
              { title: { contains: input.search, mode: "insensitive" } },
              { caseNumber: { contains: input.search, mode: "insensitive" } },
              { defendants: { hasSome: [input.search] } },
            ],
          }),
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { filingDate: "desc" },
        include: {
          _count: {
            select: { prospects: true },
          },
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (triggers.length > input.limit) {
        const nextItem = triggers.pop();
        nextCursor = nextItem!.id;
      }

      return {
        triggers,
        nextCursor,
      };
    }),

  // Get a single trigger by ID
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const trigger = await ctx.db.trigger.findUnique({
        where: { id: input.id },
        include: {
          parties: {
            include: {
              company: true,
            },
          },
          prospects: {
            include: {
              company: true,
            },
            take: 10,
          },
        },
      });

      if (!trigger) {
        throw new Error("Trigger not found");
      }

      return trigger;
    }),

  // Update trigger status
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(TriggerStatus),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.trigger.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    }),

  // Get trigger stats
  stats: protectedProcedure.query(async ({ ctx }) => {
    const [total, newCount, reviewedCount, byCategory] = await Promise.all([
      ctx.db.trigger.count(),
      ctx.db.trigger.count({ where: { status: "NEW" } }),
      ctx.db.trigger.count({ where: { status: "REVIEWED" } }),
      ctx.db.trigger.groupBy({
        by: ["caseCategory"],
        _count: { id: true },
        where: { caseCategory: { not: null } },
      }),
    ]);

    return {
      total,
      new: newCount,
      reviewed: reviewedCount,
      byCategory,
    };
  }),
});
