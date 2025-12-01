import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "info" | "outline";
}

const variants = {
  default: "bg-primary-100 text-primary-700",
  success: "bg-emerald-100 text-emerald-700",
  warning: "bg-secondary-100 text-secondary-700",
  info: "bg-blue-100 text-blue-700",
  outline: "border border-primary-300 text-primary-700 bg-transparent",
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
