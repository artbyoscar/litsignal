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

const stats = [
  {
    name: "New Triggers",
    value: "23",
    change: "+12%",
    changeType: "positive" as const,
    icon: Zap,
  },
  {
    name: "Active Prospects",
    value: "156",
    change: "+8%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    name: "Campaigns Sent",
    value: "12",
    change: "+3",
    changeType: "neutral" as const,
    icon: Send,
  },
  {
    name: "Conversion Rate",
    value: "4.2%",
    change: "+0.8%",
    changeType: "positive" as const,
    icon: TrendingUp,
  },
];

const recentTriggers = [
  {
    id: "1",
    company: "TechCorp Industries",
    caseType: "Securities Fraud",
    court: "S.D.N.Y.",
    date: "2 hours ago",
    prospects: 12,
  },
  {
    id: "2",
    company: "Global Manufacturing LLC",
    caseType: "Employment Discrimination",
    court: "N.D. Cal.",
    date: "5 hours ago",
    prospects: 8,
  },
  {
    id: "3",
    company: "DataFlow Systems",
    caseType: "Data Breach",
    court: "D. Del.",
    date: "1 day ago",
    prospects: 15,
  },
];

export default function DashboardPage() {
  const { data: health } = api.health.ping.useQuery();

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
            <div className="space-y-4">
              {recentTriggers.map((trigger) => (
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
                        {trigger.company}
                      </p>
                      <p className="text-sm text-text-muted">
                        {trigger.caseType} • {trigger.court}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="cyan">{trigger.prospects} prospects</Badge>
                    <p className="text-xs text-text-muted mt-1">
                      {trigger.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
