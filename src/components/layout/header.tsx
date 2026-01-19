"use client";

import { Bell, HelpCircle } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border-subtle bg-background-primary/80 backdrop-blur-sm px-6">
      <div>
        <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
        {description && (
          <p className="text-sm text-text-muted">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg text-text-secondary hover:bg-background-tertiary transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-accent-cyan" />
        </button>

        <button className="p-2 rounded-lg text-text-secondary hover:bg-background-tertiary transition-colors">
          <HelpCircle className="h-5 w-5" />
        </button>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-8 w-8",
            },
          }}
        />
      </div>
    </header>
  );
}
