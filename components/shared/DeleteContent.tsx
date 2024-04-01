import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type DeleteContentProps = {
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
};

const DeleteContent: React.FC<DeleteContentProps> = ({
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <>
      <DialogHeader className="border-b border-light-gray py-4">
        <DialogTitle className="text-center text-xl font-bold">
          Delete
        </DialogTitle>
      </DialogHeader>
      <DialogDescription className="p-4 text-base font-normal leading-7 text-color-dark">
        Are you sure you want to delete?
      </DialogDescription>
      <DialogFooter className="p-4">
        <Button
          onClick={onClose}
          disabled={isLoading}
          className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
        >
          No
        </Button>
        <Button
          onClick={onConfirm}
          disabled={isLoading}
          className="theme-primary-btn h-12 w-full rounded bg-dark-orange text-center text-lg font-bold leading-6"
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
      </DialogFooter>
    </>
  );
};

export default DeleteContent;
