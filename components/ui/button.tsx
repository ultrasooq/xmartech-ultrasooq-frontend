/**
 * @file Button - Shadcn UI button component.
 * @description A polymorphic button with multiple visual variants and size options.
 * Supports rendering as a child element via the asChild prop (Radix Slot pattern).
 *
 * @props
 *   - variant {"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"}
 *     Visual style variant.
 *   - size {"default" | "xs" | "sm" | "lg" | "icon"} - Button size preset.
 *   - asChild {boolean} - When true, renders as the child element via Radix Slot.
 *   - Plus all native button HTML attributes.
 *
 * @exports Button - The styled button component with forwarded ref.
 * @exports buttonVariants - CVA variant configuration for external use.
 *
 * @dependencies
 *   - @radix-ui/react-slot - Polymorphic slot for asChild rendering.
 *   - class-variance-authority (cva) - Variant-based class generation.
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/** CVA configuration defining all button variant and size combinations. */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-8 rounded-md px-3",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
