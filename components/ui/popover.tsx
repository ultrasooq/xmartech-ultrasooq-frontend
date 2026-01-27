/**
 * @file Popover - Shadcn UI popover component.
 * @description Floating content panel triggered by user interaction (click).
 * Renders via a portal with animated entrance/exit and configurable alignment.
 *
 * @exports Popover - Root state manager (re-export of Radix Popover.Root).
 * @exports PopoverTrigger - Element that opens the popover on interaction.
 * @exports PopoverAnchor - Optional anchor element for positioning.
 * @exports PopoverContent - The floating panel with border, shadow, and animations.
 *
 * @props PopoverContent accepts:
 *   - align {"start" | "center" | "end"} - Horizontal alignment (default: "center").
 *   - sideOffset {number} - Offset from the trigger element (default: 4).
 *   - className {string} - Additional CSS classes.
 *
 * @dependencies
 *   - @radix-ui/react-popover - Accessible popover primitive.
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

/** Popover root managing open/close state. */
const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
