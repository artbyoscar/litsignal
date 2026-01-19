"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { Bell, Plus, Zap, Building2, TrendingUp, Settings } from "lucide-react";

const alerts = [
  {
    id: "1",
    name: "Tech Securities Fraud",
    type: "Case Type",
    criteria: "Securities Fraud + Technology Industry",
    status: "active",
    triggered: 12,
    lastTriggered: "2 hours ago",
  },
  {
    id: "2",
    name: "Large Company EPLI",
    type: "Company Size",
    criteria: "EPLI + 1000+ employees",
    status: "active",
    triggered: 8,
    lastTriggered: "1 day ago",
  },
  {
    id: "3",
    name: "Healthcare Data Breach",
    type: "Industry",
    criteria: "Data Breach + Healthcare",
    status: "paused",
    triggered: 5,
    lastTriggered: "3 days ago",
  },
];

export default function AlertsPage() {
  return (
    <div className="min-h-screen">
      <Header
        title="Alerts"
        description="Get notified when relevant triggers appear"
      />

      <div className="p-6 space-y-6">
        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <p className="text-text-secondary">
            {alerts.length} alerts configured
          </p>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Alert
          </Button>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => (
            <Card key={alert.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                      <Bell className="h-5 w-5 text-accent-cyan" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-text-primary">{alert.name}</h3>
                        <Badge
                          variant={alert.status === "active" ? "success" : "default"}
                        >
                          {alert.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-text-muted mt-1">{alert.criteria}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs text-text-muted">
                          Type: <span className="text-text-secondary">{alert.type}</span>
                        </span>
                        <span className="text-xs text-text-muted">
                          Triggered: <span className="text-text-secondary">{alert.triggered} times</span>
                        </span>
                        <span className="text-xs text-text-muted">
                          Last: <span className="text-text-secondary">{alert.lastTriggered}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Alert Types Info */}
        <Card>
          <CardHeader>
            <CardTitle>Alert Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-background-tertiary">
                <div className="h-8 w-8 rounded-lg bg-status-warning/10 flex items-center justify-center mb-3">
                  <Zap className="h-4 w-4 text-status-warning" />
                </div>
                <h4 className="font-medium text-text-primary">Case Type</h4>
                <p className="text-sm text-text-muted mt-1">
                  Trigger when specific case types are filed (D&O, EPLI, Cyber)
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background-tertiary">
                <div className="h-8 w-8 rounded-lg bg-accent-cyan/10 flex items-center justify-center mb-3">
                  <Building2 className="h-4 w-4 text-accent-cyan" />
                </div>
                <h4 className="font-medium text-text-primary">Industry</h4>
                <p className="text-sm text-text-muted mt-1">
                  Trigger when companies in specific industries are sued
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background-tertiary">
                <div className="h-8 w-8 rounded-lg bg-status-success/10 flex items-center justify-center mb-3">
                  <TrendingUp className="h-4 w-4 text-status-success" />
                </div>
                <h4 className="font-medium text-text-primary">Company Size</h4>
                <p className="text-sm text-text-muted mt-1">
                  Trigger based on company revenue or employee count
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
