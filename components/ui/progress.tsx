/**
 * @file Progress - Shadcn UI progress bar component.
 * @description Renders a horizontal progress indicator that fills based on a value (0-100).
 * Uses a CSS translateX transform on the indicator to animate the fill amount.
 *
 * @props Accepts all props from Radix UI Progress.Root including:
 *   - value {number} - Current progress value (0-100).
 *   - className {string} - Additional CSS classes for the root element.
 *
 * @dependencies
 *   - @radix-ui/react-progress - Accessible progress primitive.
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 *
 * @example
 *   <Progress value={60} />
 */
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

/** Styled progress bar wrapper with animated indicator. */
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
