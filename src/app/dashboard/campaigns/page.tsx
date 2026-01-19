"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { Send, Plus, MoreHorizontal, Mail, Users, TrendingUp } from "lucide-react";

const campaigns = [
  {
    id: "1",
    name: "Q1 D&O Outreach",
    status: "active",
    prospects: 45,
    sent: 32,
    opened: 18,
    replied: 5,
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Tech Sector Cyber Liability",
    status: "active",
    prospects: 28,
    sent: 28,
    opened: 12,
    replied: 3,
    createdAt: "2024-01-08",
  },
  {
    id: "3",
    name: "Manufacturing EPLI Push",
    status: "paused",
    prospects: 56,
    sent: 40,
    opened: 22,
    replied: 8,
    createdAt: "2024-01-05",
  },
  {
    id: "4",
    name: "Healthcare D&O Campaign",
    status: "draft",
    prospects: 33,
    sent: 0,
    opened: 0,
    replied: 0,
    createdAt: "2024-01-12",
  },
];

export default function CampaignsPage() {
  return (
    <div className="min-h-screen">
      <Header
        title="Campaigns"
        description="Outreach campaigns to prospects"
      />

      <div className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                <Send className="h-5 w-5 text-accent-cyan" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-text-primary">4</p>
                <p className="text-sm text-text-muted">Total Campaigns</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-status-success/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-status-success" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-text-primary">100</p>
                <p className="text-sm text-text-muted">Emails Sent</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-status-warning/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-status-warning" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-text-primary">52%</p>
                <p className="text-sm text-text-muted">Open Rate</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-status-info/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-status-info" />
              </div>
              <div>
                <p className="text-2xl font-semibold text-text-primary">16%</p>
                <p className="text-sm text-text-muted">Reply Rate</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">All Campaigns</h2>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-2 gap-4">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:bg-background-tertiary transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base">{campaign.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      campaign.status === "active"
                        ? "success"
                        : campaign.status === "paused"
                        ? "warning"
                        : "default"
                    }
                  >
                    {campaign.status}
                  </Badge>
                  <button className="p-1 hover:bg-background-elevated rounded">
                    <MoreHorizontal className="h-4 w-4 text-text-muted" />
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-lg font-semibold text-text-primary">{campaign.prospects}</p>
                    <p className="text-xs text-text-muted">Prospects</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-text-primary">{campaign.sent}</p>
                    <p className="text-xs text-text-muted">Sent</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-text-primary">{campaign.opened}</p>
                    <p className="text-xs text-text-muted">Opened</p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-text-primary">{campaign.replied}</p>
                    <p className="text-xs text-text-muted">Replied</p>
                  </div>
                </div>
                <p className="text-xs text-text-muted mt-4">Created {campaign.createdAt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
