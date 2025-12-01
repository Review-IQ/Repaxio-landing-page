import { forwardRef, type HTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "gradient";
  hover?: boolean;
  animate?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", hover = true, animate = false, children, ...props }, ref) => {
    const baseClasses = cn(
      "rounded-2xl p-6 transition-all duration-300",
      variant === "default" && "bg-white card-shadow",
      variant === "glass" && "glass",
      variant === "gradient" && "gradient-bg text-white",
      hover && "hover:card-shadow-hover hover:-translate-y-1",
      className
    );

    if (animate) {
      const motionProps = props as unknown as HTMLMotionProps<"div">;
      return (
        <motion.div
          ref={ref}
          className={baseClasses}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          {...motionProps}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
