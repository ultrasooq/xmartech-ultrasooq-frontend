/**
 * @file RadioGroup - Shadcn UI radio group component.
 * @description Renders a group of mutually exclusive radio buttons. Each item shows
 * a filled circle indicator (using FaCircle from react-icons) when selected, styled
 * with the dark-orange brand color.
 *
 * @exports RadioGroup - Root radio group container with grid layout.
 * @exports RadioGroupItem - Individual radio button with circular indicator.
 *
 * @props RadioGroup accepts all Radix RadioGroup.Root props (value, onValueChange, etc.).
 * @props RadioGroupItem accepts all Radix RadioGroup.Item props (value, disabled, etc.).
 *
 * @dependencies
 *   - @radix-ui/react-radio-group - Accessible radio group primitive.
 *   - react-icons/fa (FaCircle) - Filled circle icon for selected state.
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
"use client";

import * as React from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { Circle } from "lucide-react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { FaCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";

/** Root radio group container laying items in a grid with gap. */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-dark-orange text-dark-orange shadow-sm focus:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        {/* <Circle className="h-2 w-2 fill-current text-current" /> */}
        <FaCircle
          color="#DB2302"
          className="h-2 w-2 fill-current text-current"
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
