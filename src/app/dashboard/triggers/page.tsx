"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, Badge, Button } from "@/components/ui";
import { Zap, Filter, Download, Search } from "lucide-react";

const triggers = [
  {
    id: "1",
    company: "TechCorp Industries",
    caseType: "Securities Fraud",
    caseNumber: "1:24-cv-01234",
    court: "S.D.N.Y.",
    filingDate: "2024-01-15",
    status: "new",
    prospects: 12,
  },
  {
    id: "2",
    company: "Global Manufacturing LLC",
    caseType: "Employment Discrimination",
    caseNumber: "3:24-cv-05678",
    court: "N.D. Cal.",
    filingDate: "2024-01-14",
    status: "new",
    prospects: 8,
  },
  {
    id: "3",
    company: "DataFlow Systems",
    caseType: "Data Breach",
    caseNumber: "1:24-cv-09012",
    court: "D. Del.",
    filingDate: "2024-01-13",
    status: "reviewed",
    prospects: 15,
  },
  {
    id: "4",
    company: "Acme Financial Services",
    caseType: "D&O Liability",
    caseNumber: "2:24-cv-03456",
    court: "C.D. Cal.",
    filingDate: "2024-01-12",
    status: "reviewed",
    prospects: 22,
  },
  {
    id: "5",
    company: "Healthcare Plus Inc",
    caseType: "EPLI",
    caseNumber: "1:24-cv-07890",
    court: "S.D. Tex.",
    filingDate: "2024-01-11",
    status: "archived",
    prospects: 6,
  },
];

export default function TriggersPage() {
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
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                    Company
                  </th>
                  <th className="text-left text-xs font-medium text-text-muted uppercase tracking-wider px-6 py-4">
                    Case Type
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
                {triggers.map((trigger) => (
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
                            {trigger.company}
                          </p>
                          <p className="text-xs text-text-muted">
                            {trigger.caseNumber}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {trigger.caseType}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {trigger.court}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {trigger.filingDate}
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          trigger.status === "new"
                            ? "cyan"
                            : trigger.status === "reviewed"
                            ? "success"
                            : "default"
                        }
                      >
                        {trigger.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="cyan">{trigger.prospects}</Badge>
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
