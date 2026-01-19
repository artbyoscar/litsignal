import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import {
  AlertStatus,
  AlertFrequency,
  CaseCategory,
  InsuranceLine,
} from "@prisma/client";

export const alertsRouter = createTRPCRouter({
  // Get all alerts
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.alert.findMany({
      where: {
        createdById: ctx.userId,
      },
      orderBy: { createdAt: "desc" },
    });
  }),

  // Get single alert
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const alert = await ctx.db.alert.findUnique({
        where: { id: input.id },
      });

      if (!alert) {
        throw new Error("Alert not found");
      }

      return alert;
    }),

  // Create alert
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        caseCategories: z.array(z.nativeEnum(CaseCategory)).optional(),
        insuranceLines: z.array(z.nativeEnum(InsuranceLine)).optional(),
        jurisdictions: z.array(z.string()).optional(),
        minCompanySize: z.number().optional(),
        maxCompanySize: z.number().optional(),
        industries: z.array(z.string()).optional(),
        frequency: z.nativeEnum(AlertFrequency).default("IMMEDIATE"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.alert.create({
        data: {
          organizationId: ctx.orgId || "default",
          createdById: ctx.userId,
          name: input.name,
          description: input.description,
          caseCategories: input.caseCategories || [],
          insuranceLines: input.insuranceLines || [],
          jurisdictions: input.jurisdictions || [],
          minCompanySize: input.minCompanySize,
          maxCompanySize: input.maxCompanySize,
          industries: input.industries || [],
          frequency: input.frequency,
        },
      });
    }),

  // Update alert
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        status: z.nativeEnum(AlertStatus).optional(),
        caseCategories: z.array(z.nativeEnum(CaseCategory)).optional(),
        insuranceLines: z.array(z.nativeEnum(InsuranceLine)).optional(),
        frequency: z.nativeEnum(AlertFrequency).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.alert.update({
        where: { id },
        data,
      });
    }),

  // Delete alert
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.alert.delete({
        where: { id: input.id },
      });
    }),
});
