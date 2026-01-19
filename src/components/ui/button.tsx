import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-50 disabled:pointer-events-none",
          {
            "bg-accent-cyan text-background-primary hover:bg-accent-cyanMuted":
              variant === "primary",
            "bg-background-tertiary text-text-primary hover:bg-background-elevated border border-border-subtle":
              variant === "secondary",
            "text-text-secondary hover:text-text-primary hover:bg-background-tertiary":
              variant === "ghost",
            "bg-status-error text-white hover:bg-red-600":
              variant === "danger",
            "text-sm px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md",
            "text-base px-6 py-3": size === "lg",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
