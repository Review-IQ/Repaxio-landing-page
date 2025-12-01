import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  error?: string;
  label?: string;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, error, label, id, placeholder, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={id}
            className={cn(
              "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-dark appearance-none cursor-pointer transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-red-500 focus:ring-red-500",
              !props.value && "text-slate-400",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} className="text-dark">
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
        {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
