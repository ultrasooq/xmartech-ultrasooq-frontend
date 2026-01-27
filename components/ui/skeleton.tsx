/**
 * @file Skeleton - Shadcn UI skeleton loading placeholder component.
 * @description Renders a pulsing placeholder element used to indicate loading state.
 * Apply width/height/border-radius via className to match the shape of the
 * content being loaded.
 *
 * @props Accepts all native HTMLDivElement attributes including:
 *   - className {string} - Additional CSS classes for sizing/shape.
 *
 * @dependencies
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 *
 * @example
 *   <Skeleton className="h-4 w-48" />
 *   <Skeleton className="h-12 w-12 rounded-full" />
 */
import { cn } from "@/lib/utils"

/** Pulsing placeholder element for loading states. */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
