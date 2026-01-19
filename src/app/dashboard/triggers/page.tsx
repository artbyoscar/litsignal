"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Zap, Filter, Download, Search } from "lucide-react";
import { api } from "@/lib/trpc";

export default function TriggersPage() {
  const { data: triggersData, isLoading } = api.triggers.list.useQuery({
    limit: 50,
  });

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "NEW":
        return "cyan";
      case "REVIEWED":
        return "success";
      case "ARCHIVED":
        return "default";
      default:
        return "default";
    }
  };
  return (
    <div className="min-h-screen">
      <Header
        title="Triggers"
        description="Lawsuit filings that create sales opportunities"
      />

      <div className="p-6 space-y-6">
        {/* Filters Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search triggers..."
                className="pl-10 pr-4 py-2 bg-background-secondary border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan w-64"
              />
            </div>
            <Button variant="secondary" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          <Button variant="secondary" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Triggers List */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="animate-pulse flex items-center gap-4">
                    <div className="h-8 w-8 rounded-lg bg-background-tertiary" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-48 bg-background-tertiary rounded" />
                      <div className="h-3 w-32 bg-background-tertiary rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : triggersData?.triggers.length === 0 ? (
              <div className="text-center py-12 text-text-muted">
                <Zap className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No triggers found</p>
                <p className="text-sm mt-1">
                  Triggers will appear here when lawsuit filings are detected
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Case
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Category
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Court
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Filing Date
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Prospects
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {triggersData?.triggers.map((trigger) => (
                    <tr
                      key={trigger.id}
                      className="border-b border-border-subtle hover:bg-background-tertiary cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-status-warning/10 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-status-warning" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {trigger.title}
                            </p>
                            <p className="text-xs text-text-muted">
                              {trigger.caseNumber || "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {trigger.caseCategory || "Unknown"}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {trigger.jurisdiction || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {formatDate(new Date(trigger.filingDate))}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={getStatusVariant(trigger.status)}>
                          {trigger.status.toLowerCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="cyan">{trigger._count.prospects}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
