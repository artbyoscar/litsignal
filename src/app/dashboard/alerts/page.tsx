"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from "@/components/ui";
import { Bell, Plus, Zap, Building2, TrendingUp, Settings } from "lucide-react";
import { api } from "@/lib/trpc";

export default function AlertsPage() {
  const { data: alerts, isLoading } = api.alerts.list.useQuery();

  const getStatusVariant = (status: string) => {
    return status === "ACTIVE" ? "success" : "default";
  };

  const formatCriteria = (alert: any) => {
    const parts = [];
    if (alert.caseCategories?.length) {
      parts.push(alert.caseCategories.join(", "));
    }
    if (alert.insuranceLines?.length) {
      parts.push(alert.insuranceLines.join(", "));
    }
    if (alert.industries?.length) {
      parts.push(alert.industries.join(", "));
    }
    if (alert.minCompanySize || alert.maxCompanySize) {
      const sizeRange = [];
      if (alert.minCompanySize) sizeRange.push(`${alert.minCompanySize}+ employees`);
      if (alert.maxCompanySize) sizeRange.push(`max ${alert.maxCompanySize} employees`);
      parts.push(sizeRange.join(" - "));
    }
    return parts.join(" + ") || "No criteria specified";
  };
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
            {isLoading ? "Loading..." : `${alerts?.length || 0} alerts configured`}
          </p>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Alert
          </Button>
        </div>

        {/* Alerts List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="animate-pulse flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-background-tertiary" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-48 bg-background-tertiary rounded" />
                      <div className="h-4 w-64 bg-background-tertiary rounded" />
                      <div className="h-3 w-96 bg-background-tertiary rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : alerts?.length === 0 ? (
          <Card>
            <CardContent className="p-12">
              <div className="text-center text-text-muted">
                <Bell className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No alerts configured</p>
                <p className="text-sm mt-1">
                  Create an alert to get notified when relevant triggers appear
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {alerts?.map((alert) => (
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
                          <Badge variant={getStatusVariant(alert.status)}>
                            {alert.status.toLowerCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-text-muted mt-1">
                          {formatCriteria(alert)}
                        </p>
                        <div className="flex items-center gap-4 mt-3">
                          <span className="text-xs text-text-muted">
                            Frequency:{" "}
                            <span className="text-text-secondary">
                              {alert.frequency.toLowerCase()}
                            </span>
                          </span>
                          {alert.jurisdictions?.length > 0 && (
                            <span className="text-xs text-text-muted">
                              Jurisdictions:{" "}
                              <span className="text-text-secondary">
                                {alert.jurisdictions.join(", ")}
                              </span>
                            </span>
                          )}
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
        )}

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
