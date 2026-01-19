import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const companiesRouter = createTRPCRouter({
  // Get all companies
  list: protectedProcedure
    .input(
      z.object({
        industry: z.string().optional(),
        state: z.string().optional(),
        minEmployees: z.number().optional(),
        maxEmployees: z.number().optional(),
        search: z.string().optional(),
        hasLitigation: z.boolean().optional(),
        limit: z.number().min(1).max(100).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const companies = await ctx.db.company.findMany({
        where: {
          ...(input.industry && { industry: input.industry }),
          ...(input.state && { state: input.state }),
          ...(input.minEmployees && {
            employeeCount: { gte: input.minEmployees },
          }),
          ...(input.maxEmployees && {
            employeeCount: { lte: input.maxEmployees },
          }),
          ...(input.search && {
            OR: [
              { name: { contains: input.search, mode: "insensitive" } },
              { domain: { contains: input.search, mode: "insensitive" } },
            ],
          }),
          ...(input.hasLitigation && {
            caseParties: { some: {} },
          }),
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { name: "asc" },
        include: {
          _count: {
            select: {
              caseParties: true,
              prospects: true,
              contacts: true,
            },
          },
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (companies.length > input.limit) {
        const nextItem = companies.pop();
        nextCursor = nextItem!.id;
      }

      return {
        companies,
        nextCursor,
      };
    }),

  // Get single company
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const company = await ctx.db.company.findUnique({
        where: { id: input.id },
        include: {
          contacts: true,
          aliases: true,
          caseParties: {
            include: {
              trigger: {
                select: {
                  id: true,
                  title: true,
                  caseCategory: true,
                  filingDate: true,
                },
              },
            },
          },
          prospects: {
            take: 10,
          },
        },
      });

      if (!company) {
        throw new Error("Company not found");
      }

      return company;
    }),

  // Get company stats
  stats: protectedProcedure.query(async ({ ctx }) => {
    const [total, enriched, withLitigation, withProspects] = await Promise.all([
      ctx.db.company.count(),
      ctx.db.company.count({ where: { enrichedAt: { not: null } } }),
      ctx.db.company.count({ where: { caseParties: { some: {} } } }),
      ctx.db.company.count({ where: { prospects: { some: {} } } }),
    ]);

    return {
      total,
      enriched,
      withLitigation,
      withProspects,
    };
  }),

  // Search companies for autocomplete
  search: protectedProcedure
    .input(z.object({ query: z.string().min(2) }))
    .query(async ({ ctx, input }) => {
      return ctx.db.company.findMany({
        where: {
          OR: [
            { name: { contains: input.query, mode: "insensitive" } },
            { domain: { contains: input.query, mode: "insensitive" } },
          ],
        },
        take: 10,
        select: {
          id: true,
          name: true,
          domain: true,
          industry: true,
          state: true,
        },
      });
    }),
});
