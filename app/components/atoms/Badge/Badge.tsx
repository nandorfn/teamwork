import { cn } from "@func";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const badgeVariants = cva(
  "rounded-sm flex items-center",
  {
    variants: {
      variant: {
        default: "text-white bg-zinc-200 text-black dark:text-white ",
        blue: "text-blue-700 bg-blue-400",
        yellow: "text-yellow-700 bg-yellow-400",
        purple: "text-purple-700 bg-purple-400",
        green: "text-green-700 bg-green-400",
        red: "text-red-700 bg-red-400",
      },
      size: {
        default: "",
        board: "px-2",
        backlog: "px-4"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  text: string | number;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ 
  text,
  className,
  variant,
  size,
  ...props
}, ref) => {
  return (
    <div className={cn(badgeVariants({ variant, className, size }))}
      ref={ref}
      {...props}
    >
      {text}
    </div>
  );
});

Badge.displayName = "Badge";
export { Badge, badgeVariants };