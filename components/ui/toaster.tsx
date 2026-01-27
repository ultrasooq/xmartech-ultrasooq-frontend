/**
 * @file Toaster - Shadcn UI toast notification renderer.
 * @description Renders all active toast notifications managed by the useToast hook.
 * Each toast may include a title, description, action slot, and close button.
 * All toasts are rendered inside a fixed-position viewport via ToastProvider.
 *
 * @behavior Reads from the global toast queue via useToast() and maps each toast
 * to a Toast component with its associated metadata.
 *
 * @dependencies
 *   - @/components/ui/toast - Toast sub-components (Toast, ToastClose, etc.).
 *   - @/components/ui/use-toast - Toast state management hook.
 */
"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

/** Renders the global toast notification stack. */
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title ? <ToastTitle>{title}</ToastTitle> : null}
              {description ? (
                <ToastDescription>{description}</ToastDescription>
              ) : null}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
