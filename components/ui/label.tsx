/**
 * @file Label - Shadcn UI label component.
 * @description Renders an accessible label element for form controls.
 * Applies disabled styling when the associated peer control is disabled.
 *
 * @props Accepts all Radix UI Label.Root props including:
 *   - htmlFor {string} - Associates the label with a form input by ID.
 *   - className {string} - Additional CSS classes.
 *
 * @dependencies
 *   - @radix-ui/react-label - Accessible label primitive.
 *   - class-variance-authority (cva) - Variant-based class generation.
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/** Base label styles with peer-disabled awareness. */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
