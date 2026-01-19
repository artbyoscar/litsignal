"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Users, Filter, Download, Search, MoreHorizontal } from "lucide-react";
import { api } from "@/lib/trpc";

export default function ProspectsPage() {
  const { data: prospectsData, isLoading: prospectsLoading } =
    api.prospects.list.useQuery({ limit: 50 });
  const { data: stats, isLoading: statsLoading } =
    api.prospects.stats.useQuery();

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "QUALIFIED":
        return "error";
      case "CONTACTED":
        return "warning";
      case "NEW":
        return "cyan";
      default:
        return "default";
    }
  };
  return (
    <div className="min-h-screen">
      <Header
        title="Prospects"
        description="Qualified leads from litigation triggers"
      />

      <div className="p-6 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            {statsLoading ? (
              <div className="animate-pulse">
                <div className="h-8 w-16 bg-background-tertiary rounded" />
                <div className="h-4 w-24 bg-background-tertiary rounded mt-2" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-semibold text-text-primary">
                  {stats?.total || 0}
                </p>
                <p className="text-sm text-text-muted">Total Prospects</p>
              </>
            )}
          </Card>
          <Card className="p-4">
            {statsLoading ? (
              <div className="animate-pulse">
                <div className="h-8 w-16 bg-background-tertiary rounded" />
                <div className="h-4 w-24 bg-background-tertiary rounded mt-2" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-semibold text-status-error">
                  {stats?.qualified || 0}
                </p>
                <p className="text-sm text-text-muted">Qualified</p>
              </>
            )}
          </Card>
          <Card className="p-4">
            {statsLoading ? (
              <div className="animate-pulse">
                <div className="h-8 w-16 bg-background-tertiary rounded" />
                <div className="h-4 w-24 bg-background-tertiary rounded mt-2" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-semibold text-status-warning">
                  {stats?.contacted || 0}
                </p>
                <p className="text-sm text-text-muted">Contacted</p>
              </>
            )}
          </Card>
          <Card className="p-4">
            {statsLoading ? (
              <div className="animate-pulse">
                <div className="h-8 w-16 bg-background-tertiary rounded" />
                <div className="h-4 w-24 bg-background-tertiary rounded mt-2" />
              </div>
            ) : (
              <>
                <p className="text-2xl font-semibold text-text-secondary">
                  {stats?.new || 0}
                </p>
                <p className="text-sm text-text-muted">New</p>
              </>
            )}
          </Card>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search prospects..."
                className="pl-10 pr-4 py-2 bg-background-secondary border border-border-subtle rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-cyan w-64"
              />
            </div>
            <Button variant="secondary" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">Add to Campaign</Button>
          </div>
        </div>

        {/* Prospects Table */}
        <Card>
          <CardContent className="p-0">
            {prospectsLoading ? (
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
            ) : prospectsData?.prospects.length === 0 ? (
              <div className="text-center py-12 text-text-muted">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No prospects found</p>
                <p className="text-sm mt-1">
                  Prospects will appear here when triggers are matched with companies
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Company
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Industry
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Score
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Assigned To
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Trigger
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {prospectsData?.prospects.map((prospect) => (
                    <tr
                      key={prospect.id}
                      className="border-b border-border-subtle hover:bg-background-tertiary cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-accent-cyan" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {prospect.company.name}
                            </p>
                            <p className="text-xs text-text-muted">
                              {prospect.company.employeeCount
                                ? `${prospect.company.employeeCount} employees`
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {prospect.company.industry || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-2 bg-background-tertiary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent-cyan rounded-full"
                              style={{ width: `${prospect.overallScore}%` }}
                            />
                          </div>
                          <span className="text-sm text-text-primary">
                            {prospect.overallScore}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={getStatusVariant(prospect.status)}>
                          {prospect.status.toLowerCase()}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {prospect.assignedTo?.name || "—"}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-muted">
                        {prospect.trigger?.title || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1 hover:bg-background-elevated rounded">
                          <MoreHorizontal className="h-4 w-4 text-text-muted" />
                        </button>
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
