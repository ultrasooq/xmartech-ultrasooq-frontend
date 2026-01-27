/**
 * @file Switch - Shadcn UI toggle switch component.
 * @description Renders an accessible on/off toggle switch with a sliding thumb.
 * The thumb translates horizontally to indicate checked/unchecked states.
 *
 * @props Accepts all Radix UI Switch.Root props including:
 *   - checked {boolean} - Current state.
 *   - onCheckedChange {(checked: boolean) => void} - State change handler.
 *   - disabled {boolean} - Disables the switch.
 *   - className {string} - Additional CSS classes.
 *
 * @dependencies
 *   - @radix-ui/react-switch - Accessible switch primitive.
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

/** Toggle switch with sliding thumb indicator. */
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-xs transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input md:w-9",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
