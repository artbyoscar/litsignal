import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { ProspectStatus, ProspectType, InsuranceLine } from "@prisma/client";

export const prospectsRouter = createTRPCRouter({
  // Get all prospects
  list: protectedProcedure
    .input(
      z.object({
        status: z.nativeEnum(ProspectStatus).optional(),
        type: z.nativeEnum(ProspectType).optional(),
        insuranceLine: z.nativeEnum(InsuranceLine).optional(),
        minScore: z.number().min(0).max(100).optional(),
        assignedToId: z.string().optional(),
        search: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const prospects = await ctx.db.prospect.findMany({
        where: {
          ...(input.status && { status: input.status }),
          ...(input.type && { prospectType: input.type }),
          ...(input.insuranceLine && {
            insuranceLines: { has: input.insuranceLine },
          }),
          ...(input.minScore && { overallScore: { gte: input.minScore } }),
          ...(input.assignedToId && { assignedToId: input.assignedToId }),
          ...(input.search && {
            company: {
              OR: [
                { name: { contains: input.search, mode: "insensitive" } },
                { domain: { contains: input.search, mode: "insensitive" } },
              ],
            },
          }),
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { overallScore: "desc" },
        include: {
          company: true,
          trigger: {
            select: {
              id: true,
              title: true,
              caseCategory: true,
            },
          },
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (prospects.length > input.limit) {
        const nextItem = prospects.pop();
        nextCursor = nextItem!.id;
      }

      return {
        prospects,
        nextCursor,
      };
    }),

  // Get a single prospect
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const prospect = await ctx.db.prospect.findUnique({
        where: { id: input.id },
        include: {
          company: {
            include: {
              contacts: true,
            },
          },
          trigger: true,
          assignedTo: true,
          contacts: {
            include: {
              contact: true,
            },
          },
          activities: {
            orderBy: { createdAt: "desc" },
            take: 20,
          },
        },
      });

      if (!prospect) {
        throw new Error("Prospect not found");
      }

      return prospect;
    }),

  // Update prospect status
  updateStatus: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.nativeEnum(ProspectStatus),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const prospect = await ctx.db.prospect.update({
        where: { id: input.id },
        data: {
          status: input.status,
          ...(input.status === "CONTACTED" && { contactedAt: new Date() }),
          ...(input.status === "WON" && { convertedAt: new Date() }),
        },
      });

      // Log activity
      await ctx.db.prospectActivity.create({
        data: {
          prospectId: input.id,
          type: "STATUS_CHANGED",
          description: `Status changed to ${input.status}`,
        },
      });

      return prospect;
    }),

  // Assign prospect to user
  assign: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        assignedToId: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const prospect = await ctx.db.prospect.update({
        where: { id: input.id },
        data: { assignedToId: input.assignedToId },
      });

      await ctx.db.prospectActivity.create({
        data: {
          prospectId: input.id,
          type: "ASSIGNED",
          description: input.assignedToId
            ? `Assigned to user`
            : `Unassigned`,
        },
      });

      return prospect;
    }),

  // Add note to prospect
  addNote: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        note: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const prospect = await ctx.db.prospect.update({
        where: { id: input.id },
        data: { notes: input.note },
      });

      await ctx.db.prospectActivity.create({
        data: {
          prospectId: input.id,
          type: "NOTE_ADDED",
          description: input.note,
        },
      });

      return prospect;
    }),

  // Get prospect stats
  stats: protectedProcedure.query(async ({ ctx }) => {
    const [total, byStatus, avgScore] = await Promise.all([
      ctx.db.prospect.count(),
      ctx.db.prospect.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
      ctx.db.prospect.aggregate({
        _avg: { overallScore: true },
      }),
    ]);

    const statusCounts = byStatus.reduce(
      (acc, item) => {
        acc[item.status] = item._count.id;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      total,
      new: statusCounts["NEW"] || 0,
      contacted: statusCounts["CONTACTED"] || 0,
      qualified: statusCounts["QUALIFIED"] || 0,
      won: statusCounts["WON"] || 0,
      avgScore: Math.round(avgScore._avg.overallScore || 0),
    };
  }),
});
