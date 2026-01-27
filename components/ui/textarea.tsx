/**
 * @file Textarea - Shadcn UI textarea component.
 * @description Renders a styled multi-line text input with consistent border,
 * focus ring, placeholder, and disabled styling.
 *
 * @props Accepts all native HTMLTextAreaElement attributes including:
 *   - placeholder {string} - Placeholder text.
 *   - rows {number} - Number of visible text lines.
 *   - disabled {boolean} - Disables the textarea.
 *   - className {string} - Additional CSS classes.
 *
 * @dependencies
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/** Styled multi-line text input with focus ring and placeholder styling. */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
