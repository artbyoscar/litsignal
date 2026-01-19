import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "cyan";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          "bg-background-tertiary text-text-secondary": variant === "default",
          "bg-status-success/10 text-status-success": variant === "success",
          "bg-status-warning/10 text-status-warning": variant === "warning",
          "bg-status-error/10 text-status-error": variant === "error",
          "bg-status-info/10 text-status-info": variant === "info",
          "bg-accent-cyan/10 text-accent-cyan": variant === "cyan",
        },
        className
      )}
      {...props}
    />
  );
}
