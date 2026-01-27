/**
 * @file ConfirmContent - Generic confirmation dialog content with Yes/No actions.
 * @description Renders a dialog with a "Confirm" header, a dynamic description
 * asking "Are you sure you want to [description]?", and Yes/No action buttons.
 * The Yes button shows a spinning loader during async operations. Designed to be
 * placed inside a Dialog component as its content.
 *
 * @props
 *   - onClose {() => void} - Callback when the No/cancel button is clicked.
 *   - onConfirm {() => void} - Callback when the Yes/confirm button is clicked.
 *   - isLoading {boolean} - When true, disables buttons and shows a spinner on Yes.
 *   - description {string} - Action description inserted into the confirmation message.
 *
 * @dependencies
 *   - @/components/ui/dialog (DialogDescription, DialogFooter, DialogHeader, DialogContent) - Dialog layout.
 *   - @/components/ui/button (Button) - Action buttons.
 *   - next/image - Loader icon image rendering.
 */
import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type ConfirmContentProps = {
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  description: string;
};

const ConfirmContent: React.FC<ConfirmContentProps> = ({
  onClose,
  onConfirm,
  isLoading,
  description,
}) => {
  return (
    <DialogContent className="custom-ui-alert-popup danger-alert-popup">
      <DialogHeader className="alert-popup-headerpart">
        <h1>Confirm</h1>
      </DialogHeader>
      <DialogDescription className="alert-popup-bodypart">
        {`Are you sure you want to ${description}?`}
      </DialogDescription>
      <DialogFooter className="alert-actions">
        <div className="alert-actions-col">
          <Button
            onClick={onClose}
            disabled={isLoading}
            className="alert--cancel-btn"
          >
            No
          </Button>
        </div>
        <div className="alert-actions-col">
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="alert--submit-btn"
          >
            {isLoading ? (
              <>
                <Image
                  src="/images/load.png"
                  alt="loader-icon"
                  width={20}
                  height={20}
                  className="mr-2 animate-spin"
                />
                Please wait
              </>
            ) : (
              "Yes"
            )}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default ConfirmContent;
