"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { BarChart3, TrendingUp, Users, Zap, Calendar } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="min-h-screen">
      <Header
        title="Reports"
        description="Analytics and performance metrics"
      />

      <div className="p-6 space-y-6">
        {/* Date Range Selector */}
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 text-sm bg-accent-cyan/10 text-accent-cyan rounded-lg">
            Last 7 days
          </button>
          <button className="px-3 py-1.5 text-sm text-text-secondary hover:bg-background-tertiary rounded-lg">
            Last 30 days
          </button>
          <button className="px-3 py-1.5 text-sm text-text-secondary hover:bg-background-tertiary rounded-lg">
            Last 90 days
          </button>
          <button className="px-3 py-1.5 text-sm text-text-secondary hover:bg-background-tertiary rounded-lg flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Custom
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">New Triggers</p>
                <p className="text-2xl font-semibold text-text-primary mt-1">47</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-status-warning/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-status-warning" />
              </div>
            </div>
            <p className="text-xs text-status-success mt-2">+12% from last period</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Prospects Generated</p>
                <p className="text-2xl font-semibold text-text-primary mt-1">234</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-accent-cyan" />
              </div>
            </div>
            <p className="text-xs text-status-success mt-2">+8% from last period</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Conversion Rate</p>
                <p className="text-2xl font-semibold text-text-primary mt-1">4.2%</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-status-success/10 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-status-success" />
              </div>
            </div>
            <p className="text-xs text-status-success mt-2">+0.8% from last period</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-text-muted">Credits Used</p>
                <p className="text-2xl font-semibold text-text-primary mt-1">23</p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-status-info/10 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-status-info" />
              </div>
            </div>
            <p className="text-xs text-text-muted mt-2">37 remaining this month</p>
          </Card>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Triggers Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-dashed border-border-subtle rounded-lg">
                <p className="text-text-muted">Chart coming soon</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Prospects by Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center border border-dashed border-border-subtle rounded-lg">
                <p className="text-text-muted">Chart coming soon</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performing */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Triggers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Securities Fraud - Tech Sector", prospects: 45, conversion: "5.2%" },
                { name: "EPLI - Manufacturing", prospects: 38, conversion: "4.8%" },
                { name: "Data Breach - Healthcare", prospects: 32, conversion: "4.5%" },
                { name: "D&O - Financial Services", prospects: 28, conversion: "3.9%" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background-tertiary">
                  <div>
                    <p className="font-medium text-text-primary">{item.name}</p>
                    <p className="text-sm text-text-muted">{item.prospects} prospects generated</p>
                  </div>
                  <p className="text-accent-cyan font-medium">{item.conversion}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
