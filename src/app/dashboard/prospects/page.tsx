"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Users, Filter, Download, Search, MoreHorizontal } from "lucide-react";

const prospects = [
  {
    id: "1",
    company: "Nexus Technologies",
    industry: "Technology",
    employees: "500-1000",
    revenue: "$50M-100M",
    score: 92,
    status: "hot",
    assignedTo: "John D.",
    trigger: "TechCorp Securities Fraud",
  },
  {
    id: "2",
    company: "Pinnacle Manufacturing",
    industry: "Manufacturing",
    employees: "1000-5000",
    revenue: "$100M-500M",
    score: 87,
    status: "warm",
    assignedTo: "Sarah M.",
    trigger: "Global Manufacturing EPLI",
  },
  {
    id: "3",
    company: "Vertex Financial",
    industry: "Financial Services",
    employees: "200-500",
    revenue: "$25M-50M",
    score: 78,
    status: "warm",
    assignedTo: "John D.",
    trigger: "Acme Financial D&O",
  },
  {
    id: "4",
    company: "CloudScale Systems",
    industry: "Technology",
    employees: "100-200",
    revenue: "$10M-25M",
    score: 65,
    status: "new",
    assignedTo: null,
    trigger: "DataFlow Data Breach",
  },
  {
    id: "5",
    company: "MedTech Solutions",
    industry: "Healthcare",
    employees: "500-1000",
    revenue: "$50M-100M",
    score: 54,
    status: "cold",
    assignedTo: "Sarah M.",
    trigger: "Healthcare Plus EPLI",
  },
];

export default function ProspectsPage() {
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
            <p className="text-2xl font-semibold text-text-primary">156</p>
            <p className="text-sm text-text-muted">Total Prospects</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-semibold text-status-error">23</p>
            <p className="text-sm text-text-muted">Hot Leads</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-semibold text-status-warning">67</p>
            <p className="text-sm text-text-muted">Warm Leads</p>
          </Card>
          <Card className="p-4">
            <p className="text-2xl font-semibold text-text-secondary">66</p>
            <p className="text-sm text-text-muted">Unassigned</p>
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
                {prospects.map((prospect) => (
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
                            {prospect.company}
                          </p>
                          <p className="text-xs text-text-muted">
                            {prospect.employees} employees
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {prospect.industry}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-background-tertiary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-accent-cyan rounded-full"
                            style={{ width: `${prospect.score}%` }}
                          />
                        </div>
                        <span className="text-sm text-text-primary">
                          {prospect.score}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          prospect.status === "hot"
                            ? "error"
                            : prospect.status === "warm"
                            ? "warning"
                            : prospect.status === "new"
                            ? "cyan"
                            : "default"
                        }
                      >
                        {prospect.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {prospect.assignedTo || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-muted">
                      {prospect.trigger}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
