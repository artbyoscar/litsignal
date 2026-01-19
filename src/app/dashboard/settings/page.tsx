"use client";

import { Header } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@/components/ui";
import { User, Building2, CreditCard, Bell, Shield, Key } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <Header
        title="Settings"
        description="Manage your account and preferences"
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg bg-accent-cyan/10 text-accent-cyan">
              <User className="h-4 w-4" />
              Profile
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-secondary hover:bg-background-tertiary">
              <Building2 className="h-4 w-4" />
              Organization
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-secondary hover:bg-background-tertiary">
              <CreditCard className="h-4 w-4" />
              Billing
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-secondary hover:bg-background-tertiary">
              <Bell className="h-4 w-4" />
              Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-secondary hover:bg-background-tertiary">
              <Key className="h-4 w-4" />
              API Keys
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-text-secondary hover:bg-background-tertiary">
              <Shield className="h-4 w-4" />
              Security
            </button>
          </div>

          {/* Settings Content */}
          <div className="col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John Doe"
                    className="w-full px-4 py-2 bg-background-tertiary border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    defaultValue="john@example.com"
                    className="w-full px-4 py-2 bg-background-tertiary border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    defaultValue="Insurance Broker"
                    className="w-full px-4 py-2 bg-background-tertiary border border-border-subtle rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan"
                  />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan & Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg bg-background-tertiary mb-4">
                  <div>
                    <p className="font-medium text-text-primary">Solo Plan</p>
                    <p className="text-sm text-text-muted">$149/month</p>
                  </div>
                  <Button variant="secondary" size="sm">Upgrade</Button>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">Enrichment Credits</span>
                      <span className="text-text-primary">23 / 60</span>
                    </div>
                    <div className="w-full h-2 bg-background-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-accent-cyan rounded-full" style={{ width: "38%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-text-secondary">Team Members</span>
                      <span className="text-text-primary">1 / 1</span>
                    </div>
                    <div className="w-full h-2 bg-background-tertiary rounded-full overflow-hidden">
                      <div className="h-full bg-accent-cyan rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
