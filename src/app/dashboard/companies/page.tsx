"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Building2, Filter, Download, Search, ExternalLink } from "lucide-react";
import { api } from "@/lib/trpc";

export default function CompaniesPage() {
  const { data: companiesData, isLoading: companiesLoading } =
    api.companies.list.useQuery({ limit: 50 });
  const { data: stats, isLoading: statsLoading } =
    api.companies.stats.useQuery();

  const formatRevenue = (revenue: number | null) => {
    if (!revenue) return "N/A";
    if (revenue >= 1_000_000_000) return `$${(revenue / 1_000_000_000).toFixed(1)}B`;
    if (revenue >= 1_000_000) return `$${(revenue / 1_000_000).toFixed(0)}M`;
    return `$${revenue.toLocaleString()}`;
  };
  return (
    <div className="min-h-screen">
      <Header
        title="Companies"
        description="Enriched company database"
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
                <p className="text-sm text-text-muted">Total Companies</p>
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
                <p className="text-2xl font-semibold text-accent-cyan">
                  {stats?.enriched || 0}
                </p>
                <p className="text-sm text-text-muted">Enriched</p>
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
                  {stats?.withLitigation || 0}
                </p>
                <p className="text-sm text-text-muted">With Litigation</p>
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
                <p className="text-2xl font-semibold text-status-success">
                  {stats?.withProspects || 0}
                </p>
                <p className="text-sm text-text-muted">Prospects</p>
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
                placeholder="Search companies..."
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

        {/* Companies Table */}
        <Card>
          <CardContent className="p-0">
            {companiesLoading ? (
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
            ) : companiesData?.companies.length === 0 ? (
              <div className="text-center py-12 text-text-muted">
                <Building2 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No companies found</p>
                <p className="text-sm mt-1">
                  Companies will appear here as they are discovered from triggers
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border-subtle">
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Company
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Industry
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Size
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Revenue
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Location
                    </th>
                    <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {companiesData?.companies.map((company) => (
                    <tr
                      key={company.id}
                      className="border-b border-border-subtle hover:bg-background-tertiary cursor-pointer transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-accent-cyan" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary">
                              {company.name}
                            </p>
                            {company.domain && (
                              <a
                                href={`https://${company.domain}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-accent-cyan hover:underline flex items-center gap-1"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {company.domain}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {company.industry || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {company.employeeCount?.toLocaleString() || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {formatRevenue(company.annualRevenue)}
                      </td>
                      <td className="px-6 py-4 text-sm text-text-secondary">
                        {company.city && company.state
                          ? `${company.city}, ${company.state}`
                          : company.state || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {company._count.caseParties > 0 ? (
                          <Badge variant="warning">
                            {company._count.caseParties} Litigation
                            {company._count.caseParties > 1 ? "s" : ""}
                          </Badge>
                        ) : company._count.prospects > 0 ? (
                          <Badge variant="cyan">
                            {company._count.prospects} Prospect
                            {company._count.prospects > 1 ? "s" : ""}
                          </Badge>
                        ) : (
                          <Badge variant="default">No Activity</Badge>
                        )}
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
