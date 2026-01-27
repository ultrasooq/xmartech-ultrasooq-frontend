/**
 * @file ScrollArea - Shadcn UI custom scrollable area component.
 * @description Provides a cross-browser custom scrollbar experience with a styled
 * viewport, vertical/horizontal scrollbar tracks, and rounded thumb indicators.
 *
 * @exports ScrollArea - Main scrollable container with auto-included vertical ScrollBar.
 * @exports ScrollBar - Styled scrollbar track and thumb supporting both orientations.
 *
 * @props ScrollArea accepts all Radix ScrollArea.Root props plus className.
 * @props ScrollBar accepts:
 *   - orientation {"vertical" | "horizontal"} - Scrollbar direction (default: "vertical").
 *
 * @dependencies
 *   - @radix-ui/react-scroll-area - Accessible scroll area primitive.
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

/** Custom scrollable container with styled scrollbar. */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" ? "h-full w-2.5 border-l border-l-transparent p-px" : "",
      orientation === "horizontal" ? "h-2.5 flex-col border-t border-t-transparent p-px" : "",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
