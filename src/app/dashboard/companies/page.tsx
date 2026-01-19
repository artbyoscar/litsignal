"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Building2, Filter, Download, Search, ExternalLink } from "lucide-react";

const companies = [
  {
    id: "1",
    name: "TechCorp Industries",
    domain: "techcorp.com",
    industry: "Technology",
    employees: "5000-10000",
    revenue: "$500M-1B",
    location: "San Francisco, CA",
    enrichedAt: "2024-01-15",
    hasLitigation: true,
  },
  {
    id: "2",
    name: "Global Manufacturing LLC",
    domain: "globalmfg.com",
    industry: "Manufacturing",
    employees: "10000+",
    revenue: "$1B+",
    location: "Detroit, MI",
    enrichedAt: "2024-01-14",
    hasLitigation: true,
  },
  {
    id: "3",
    name: "Nexus Technologies",
    domain: "nexustech.io",
    industry: "Technology",
    employees: "500-1000",
    revenue: "$50M-100M",
    location: "Austin, TX",
    enrichedAt: "2024-01-13",
    hasLitigation: false,
  },
  {
    id: "4",
    name: "Pinnacle Manufacturing",
    domain: "pinnaclemfg.com",
    industry: "Manufacturing",
    employees: "1000-5000",
    revenue: "$100M-500M",
    location: "Chicago, IL",
    enrichedAt: "2024-01-12",
    hasLitigation: false,
  },
  {
    id: "5",
    name: "Vertex Financial",
    domain: "vertexfin.com",
    industry: "Financial Services",
    employees: "200-500",
    revenue: "$25M-50M",
    location: "New York, NY",
    enrichedAt: "2024-01-11",
    hasLitigation: false,
  },
];

export default function CompaniesPage() {
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
            <p className="text-2xl font-semibold text-text-primary">1,234</p>
            <p className="text-sm text-text-muted">Total Companies</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-semibold text-accent-cyan">892</p>
            <p className="text-sm text-text-muted">Enriched</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-semibold text-status-warning">156</p>
            <p className="text-sm text-text-muted">With Litigation</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-semibold text-status-success">736</p>
            <p className="text-sm text-text-muted">Prospects</p>
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
                {companies.map((company) => (
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
                          <a
                            href={`https://${company.domain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-accent-cyan hover:underline flex items-center gap-1"
                          >
                            {company.domain}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {company.industry}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {company.employees}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {company.revenue}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {company.location}
                    </td>
                    <td className="px-6 py-4">
                      {company.hasLitigation ? (
                        <Badge variant="warning">Has Litigation</Badge>
                      ) : (
                        <Badge variant="cyan">Prospect</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
