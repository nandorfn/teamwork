import { cn } from "@func";
import { VariantProps, cva } from "class-variance-authority";
import { HTMLAttributes, forwardRef } from "react";

const loaderVariants = cva(
    "absolute top-[45%] left-[49%]", {
        variants: {
            size: {
                sm: "loader-sm",
                base: "loader-base",
            }
        },
        defaultVariants: {
            size: "base",
        }
    }
)

export interface LoaderProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof loaderVariants> {}

const Loader = forwardRef<HTMLDivElement, LoaderProps>(({
    className,
    size,
    ...props
}, ref) => {
    return (
        <div className="fixed bg-black bg-transparent bg-opacity-50 z-50 w-full h-full">
            <div 
                ref={ref} 
                {...props}
                className={cn(loaderVariants({
                    size,
                    className
                }))}>
            </div>
        </div>
    );
}
)

Loader.displayName = "Loader"

export { Loader, loaderVariants };