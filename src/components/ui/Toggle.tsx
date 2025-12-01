import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface ToggleProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  badge?: string;
}

export function Toggle<T extends string>({
  options,
  value,
  onChange,
  className,
  badge,
}: ToggleProps<T>) {
  return (
    <div className={cn("relative inline-flex items-center gap-2", className)}>
      <div className="relative flex bg-slate-100 rounded-xl p-1">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 z-10",
              value === option.value ? "text-white" : "text-slate-600 hover:text-slate-900"
            )}
          >
            {value === option.value && (
              <motion.div
                layoutId="toggle-background"
                className="absolute inset-0 bg-primary-700 rounded-lg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{option.label}</span>
          </button>
        ))}
      </div>
      {badge && (
        <span className="px-2.5 py-1 text-xs font-semibold bg-secondary-100 text-secondary-700 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}
