"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Users,
  Send,
  Settings,
  Search,
  Bell,
  FileText,
  Building2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Triggers",
    href: "/dashboard/triggers",
    icon: Zap,
  },
  {
    name: "Prospects",
    href: "/dashboard/prospects",
    icon: Users,
  },
  {
    name: "Campaigns",
    href: "/dashboard/campaigns",
    icon: Send,
  },
  {
    name: "Companies",
    href: "/dashboard/companies",
    icon: Building2,
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
];

const secondaryNavigation = [
  { name: "Alerts", href: "/dashboard/alerts", icon: Bell },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-background-secondary border-r border-border-subtle">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border-subtle">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-cyan/10">
          <Zap className="h-5 w-5 text-accent-cyan" />
        </div>
        <span className="text-lg font-semibold text-text-primary">
          LitSignal
        </span>
      </div>

      <div className="px-4 py-4">
        <button className="flex w-full items-center gap-2 rounded-lg bg-background-tertiary px-3 py-2 text-sm text-text-muted hover:bg-background-elevated transition-colors">
          <Search className="h-4 w-4" />
          <span>Search...</span>
          <kbd className="ml-auto text-xs bg-background-primary px-1.5 py-0.5 rounded">
            ⌘K
          </kbd>
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        <div className="text-xs font-medium text-text-muted uppercase tracking-wider px-3 py-2">
          Intelligence
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent-cyan/10 text-accent-cyan"
                  : "text-text-secondary hover:bg-background-tertiary hover:text-text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}

        <div className="text-xs font-medium text-text-muted uppercase tracking-wider px-3 py-2 mt-6">
          System
        </div>
        {secondaryNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent-cyan/10 text-accent-cyan"
                  : "text-text-secondary hover:bg-background-tertiary hover:text-text-primary"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border-subtle">
        <div className="flex items-center gap-3 rounded-lg bg-background-tertiary p-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-text-primary">Solo Plan</p>
            <p className="text-xs text-text-muted">60 credits remaining</p>
          </div>
          <Link
            href="/dashboard/settings/billing"
            className="text-xs text-accent-cyan hover:underline"
          >
            Upgrade
          </Link>
        </div>
      </div>
    </aside>
  );
}
