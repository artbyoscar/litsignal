import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";
import { CampaignStatus } from "@prisma/client";

export const campaignsRouter = createTRPCRouter({
  // Get all campaigns
  list: protectedProcedure
    .input(
      z.object({
        status: z.nativeEnum(CampaignStatus).optional(),
        limit: z.number().min(1).max(50).default(20),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const campaigns = await ctx.db.campaign.findMany({
        where: {
          ...(input.status && { status: input.status }),
        },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          _count: {
            select: { members: true },
          },
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (campaigns.length > input.limit) {
        const nextItem = campaigns.pop();
        nextCursor = nextItem!.id;
      }

      return {
        campaigns,
        nextCursor,
      };
    }),

  // Get single campaign
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const campaign = await ctx.db.campaign.findUnique({
        where: { id: input.id },
        include: {
          createdBy: true,
          members: {
            include: {
              prospect: {
                include: {
                  company: true,
                },
              },
            },
          },
        },
      });

      if (!campaign) {
        throw new Error("Campaign not found");
      }

      return campaign;
    }),

  // Create campaign
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        subject: z.string().optional(),
        bodyTemplate: z.string().optional(),
        prospectIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const campaign = await ctx.db.campaign.create({
        data: {
          organizationId: ctx.orgId || "default",
          name: input.name,
          description: input.description,
          subject: input.subject,
          bodyTemplate: input.bodyTemplate,
          createdById: ctx.userId,
          prospectCount: input.prospectIds?.length || 0,
        },
      });

      if (input.prospectIds?.length) {
        await ctx.db.campaignMember.createMany({
          data: input.prospectIds.map((prospectId) => ({
            campaignId: campaign.id,
            prospectId,
          })),
        });
      }

      return campaign;
    }),

  // Update campaign
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1).optional(),
        description: z.string().optional(),
        status: z.nativeEnum(CampaignStatus).optional(),
        subject: z.string().optional(),
        bodyTemplate: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return ctx.db.campaign.update({
        where: { id },
        data,
      });
    }),

  // Add prospects to campaign
  addProspects: protectedProcedure
    .input(
      z.object({
        campaignId: z.string(),
        prospectIds: z.array(z.string()),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.campaignMember.createMany({
        data: input.prospectIds.map((prospectId) => ({
          campaignId: input.campaignId,
          prospectId,
        })),
        skipDuplicates: true,
      });

      // Update prospect count
      const count = await ctx.db.campaignMember.count({
        where: { campaignId: input.campaignId },
      });

      return ctx.db.campaign.update({
        where: { id: input.campaignId },
        data: { prospectCount: count },
      });
    }),

  // Get campaign stats
  stats: protectedProcedure.query(async ({ ctx }) => {
    const [total, active, totalSent, totalOpened, totalReplied] =
      await Promise.all([
        ctx.db.campaign.count(),
        ctx.db.campaign.count({ where: { status: "ACTIVE" } }),
        ctx.db.campaign.aggregate({ _sum: { sentCount: true } }),
        ctx.db.campaign.aggregate({ _sum: { openedCount: true } }),
        ctx.db.campaign.aggregate({ _sum: { repliedCount: true } }),
      ]);

    const sent = totalSent._sum.sentCount || 0;
    const opened = totalOpened._sum.openedCount || 0;
    const replied = totalReplied._sum.repliedCount || 0;

    return {
      total,
      active,
      sent,
      opened,
      replied,
      openRate: sent > 0 ? Math.round((opened / sent) * 100) : 0,
      replyRate: sent > 0 ? Math.round((replied / sent) * 100) : 0,
    };
  }),
});
