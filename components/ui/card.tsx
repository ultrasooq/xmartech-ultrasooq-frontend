/**
 * @file Card - Shadcn UI card component family.
 * @description Provides a set of composable card primitives (Card, CardHeader, CardTitle,
 * CardDescription, CardContent, CardFooter) for building content containers with
 * consistent styling. Uses native HTML elements with forwarded refs.
 *
 * @exports Card - The root card container with rounded border and shadow.
 * @exports CardHeader - Flex-column header section with vertical spacing and padding.
 * @exports CardTitle - Semibold heading rendered as an h3 element.
 * @exports CardDescription - Muted paragraph for supplementary text.
 * @exports CardContent - Main body content area with horizontal padding.
 * @exports CardFooter - Bottom section with flex alignment for actions.
 *
 * @props Each sub-component accepts standard HTMLDivElement attributes plus className override.
 *
 * @dependencies
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

/** Root card container with rounded border, background, and subtle shadow. */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
