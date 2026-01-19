"use client";

import { Header } from "@/components/layout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
} from "@/components/ui";
import { Zap, Users, Send, TrendingUp, ArrowUpRight } from "lucide-react";
import { api } from "@/lib/trpc";
import Link from "next/link";

export default function DashboardPage() {
  const { data: health } = api.health.ping.useQuery();
  const { data: triggerStats, isLoading: triggersLoading } =
    api.triggers.stats.useQuery();
  const { data: prospectStats, isLoading: prospectsLoading } =
    api.prospects.stats.useQuery();
  const { data: campaignStats, isLoading: campaignsLoading } =
    api.campaigns.stats.useQuery();
  const { data: recentTriggersData, isLoading: recentTriggersLoading } =
    api.triggers.list.useQuery({ limit: 3 });

  const isLoading =
    triggersLoading || prospectsLoading || campaignsLoading;

  const stats = [
    {
      name: "New Triggers",
      value: triggerStats?.new.toString() || "0",
      change: `${triggerStats?.total || 0} total`,
      changeType: "positive" as const,
      icon: Zap,
    },
    {
      name: "Active Prospects",
      value: prospectStats?.total.toString() || "0",
      change: `Avg score: ${prospectStats?.avgScore || 0}`,
      changeType: "positive" as const,
      icon: Users,
    },
    {
      name: "Campaigns Active",
      value: campaignStats?.active.toString() || "0",
      change: `${campaignStats?.total || 0} total`,
      changeType: "neutral" as const,
      icon: Send,
    },
    {
      name: "Open Rate",
      value: `${campaignStats?.openRate || 0}%`,
      change: `Reply: ${campaignStats?.replyRate || 0}%`,
      changeType: "positive" as const,
      icon: TrendingUp,
    },
  ];

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  return (
    <div className="min-h-screen">
      <Header
        title="Dashboard"
        description="Litigation intelligence overview"
      />

      <div className="p-6 space-y-6">
        {health && (
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <span className="h-2 w-2 rounded-full bg-status-success" />
            API Status: {health.status}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="h-10 w-10 rounded-lg bg-background-tertiary" />
                    <div className="mt-4 h-8 w-20 bg-background-tertiary rounded" />
                    <div className="mt-2 h-4 w-24 bg-background-tertiary rounded" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-accent-cyan" />
                      </div>
                      <Badge
                        variant={
                          stat.changeType === "positive" ? "success" : "default"
                        }
                      >
                        {stat.change}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-semibold text-text-primary">
                        {stat.value}
                      </p>
                      <p className="text-sm text-text-muted">{stat.name}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Triggers</CardTitle>
              <Link
                href="/dashboard/triggers"
                className="text-sm text-accent-cyan hover:underline flex items-center gap-1"
              >
                View all
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {recentTriggersLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse flex items-center justify-between p-4 rounded-lg bg-background-tertiary"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-background-secondary" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-background-secondary rounded" />
                        <div className="h-3 w-48 bg-background-secondary rounded" />
                      </div>
                    </div>
                    <div className="h-6 w-24 bg-background-secondary rounded" />
                  </div>
                ))}
              </div>
            ) : recentTriggersData?.triggers.length === 0 ? (
              <div className="text-center py-8 text-text-muted">
                <Zap className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No triggers found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTriggersData?.triggers.map((trigger) => (
                  <div
                    key={trigger.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-background-tertiary"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-status-warning/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-status-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">
                          {trigger.title}
                        </p>
                        <p className="text-sm text-text-muted">
                          {trigger.caseCategory || "Unknown"} •{" "}
                          {trigger.jurisdiction || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="cyan">
                        {trigger._count.prospects} prospects
                      </Badge>
                      <p className="text-xs text-text-muted mt-1">
                        {formatDate(new Date(trigger.filingDate))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
