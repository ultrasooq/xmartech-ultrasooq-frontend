/**
 * @fileoverview General-purpose utility functions for the Ultrasooq frontend.
 *
 * @module lib/utils
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges class names using `clsx` for conditional logic and `tailwind-merge`
 * to intelligently resolve conflicting Tailwind CSS utility classes.
 *
 * This is the standard class-name helper used throughout the UI component
 * library and application layouts.
 *
 * @param {...ClassValue[]} inputs - Any number of class values accepted by `clsx`
 *   (strings, arrays, objects, booleans, undefined, null).
 * @returns {string} A single, de-duplicated class string with Tailwind conflicts resolved.
 *
 * @example
 * ```tsx
 * <div className={cn("px-4 py-2", isActive && "bg-blue-500", className)} />
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
