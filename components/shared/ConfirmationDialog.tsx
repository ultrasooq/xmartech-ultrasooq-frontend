/**
 * @file ConfirmationDialog - Full Dialog-based confirmation modal with variants.
 * @description Renders a controlled Dialog modal for confirming user actions.
 * Supports default and destructive visual variants. Shows a title, description,
 * and confirm/cancel buttons with customizable text. The confirm button displays
 * a spinning loader during async operations. Calls onConfirm then onClose when
 * confirmed. Uses next-intl for default button text translations.
 *
 * @props
 *   - isOpen {boolean} - Controls dialog visibility.
 *   - onClose {() => void} - Callback to close the dialog.
 *   - onConfirm {() => void} - Callback when the confirm button is clicked.
 *   - title {string} - Dialog title text.
 *   - description {string} - Dialog description/body text.
 *   - confirmText {string} - Custom confirm button text (defaults to translated "confirm").
 *   - cancelText {string} - Custom cancel button text (defaults to translated "cancel").
 *   - isLoading {boolean} - When true, disables buttons and shows spinner (default false).
 *   - variant {"default" | "destructive"} - Visual style of confirm button (default "default").
 *
 * @dependencies
 *   - @/components/ui/dialog (Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle) - Dialog layout.
 *   - @/components/ui/button (Button) - Action buttons with variant support.
 *   - next-intl (useTranslations) - Default button text translations.
 */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "default" | "destructive";
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText,
  cancelText,
  isLoading = false,
  variant = "default",
}) => {
  const t = useTranslations();

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-2">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {cancelText || t("cancel")}
          </Button>
          <Button
            type="button"
            variant={variant === "destructive" ? "destructive" : "default"}
            onClick={handleConfirm}
            disabled={isLoading}
            className="flex-1 sm:flex-none"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {t("processing")}
              </div>
            ) : (
              confirmText || t("confirm")
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
