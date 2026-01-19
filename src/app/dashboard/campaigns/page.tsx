"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { Send, Plus, MoreHorizontal, Mail, Users, TrendingUp } from "lucide-react";
import { api } from "@/lib/trpc";

export default function CampaignsPage() {
  const { data: campaignsData, isLoading: campaignsLoading } =
    api.campaigns.list.useQuery({ limit: 50 });
  const { data: stats, isLoading: statsLoading } =
    api.campaigns.stats.useQuery();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "success";
      case "PAUSED":
        return "warning";
      case "DRAFT":
        return "default";
      default:
        return "default";
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
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
              {statsLoading ? (
                <div className="animate-pulse flex-1">
                  <div className="h-8 w-12 bg-background-tertiary rounded" />
                  <div className="h-4 w-24 bg-background-tertiary rounded mt-2" />
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-semibold text-text-primary">
                    {stats?.total || 0}
                  </p>
                  <p className="text-sm text-text-muted">Total Campaigns</p>
                </div>
              )}
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-status-success/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-status-success" />
              </div>
              {statsLoading ? (
                <div className="animate-pulse flex-1">
                  <div className="h-8 w-12 bg-background-tertiary rounded" />
                  <div className="h-4 w-24 bg-background-tertiary rounded mt-2" />
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-semibold text-text-primary">
                    {stats?.sent || 0}
                  </p>
                  <p className="text-sm text-text-muted">Emails Sent</p>
                </div>
              )}
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-status-warning/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-status-warning" />
              </div>
              {statsLoading ? (
                <div className="animate-pulse flex-1">
                  <div className="h-8 w-12 bg-background-tertiary rounded" />
                  <div className="h-4 w-24 bg-background-tertiary rounded mt-2" />
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-semibold text-text-primary">
                    {stats?.openRate || 0}%
                  </p>
                  <p className="text-sm text-text-muted">Open Rate</p>
                </div>
              )}
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-status-info/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-status-info" />
              </div>
              {statsLoading ? (
                <div className="animate-pulse flex-1">
                  <div className="h-8 w-12 bg-background-tertiary rounded" />
                  <div className="h-4 w-24 bg-background-tertiary rounded mt-2" />
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-semibold text-text-primary">
                    {stats?.replyRate || 0}%
                  </p>
                  <p className="text-sm text-text-muted">Reply Rate</p>
                </div>
              )}
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
        {campaignsLoading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="animate-pulse space-y-2">
                    <div className="h-6 w-48 bg-background-tertiary rounded" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="animate-pulse space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map((j) => (
                        <div key={j} className="space-y-2">
                          <div className="h-6 w-8 bg-background-tertiary rounded mx-auto" />
                          <div className="h-3 w-12 bg-background-tertiary rounded mx-auto" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : campaignsData?.campaigns.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            <Send className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No campaigns found</p>
            <p className="text-sm mt-1">Create a campaign to start outreach to prospects</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {campaignsData?.campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:bg-background-tertiary transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base">{campaign.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusVariant(campaign.status)}>
                      {campaign.status.toLowerCase()}
                    </Badge>
                    <button className="p-1 hover:bg-background-elevated rounded">
                      <MoreHorizontal className="h-4 w-4 text-text-muted" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-text-primary">
                        {campaign.prospectCount}
                      </p>
                      <p className="text-xs text-text-muted">Prospects</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-text-primary">
                        {campaign.sentCount}
                      </p>
                      <p className="text-xs text-text-muted">Sent</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-text-primary">
                        {campaign.openedCount}
                      </p>
                      <p className="text-xs text-text-muted">Opened</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-text-primary">
                        {campaign.repliedCount}
                      </p>
                      <p className="text-xs text-text-muted">Replied</p>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mt-4">
                    Created {formatDate(new Date(campaign.createdAt))}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
