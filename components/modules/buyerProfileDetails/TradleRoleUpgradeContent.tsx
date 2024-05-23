import React from "react";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type TradeRoleUpgradeContentProps = {
  onClose?: () => void;
  onConfirmRole: (args0: "COMPANY" | "FREELANCER") => void;
};

const TradeRoleUpgradeContent: React.FC<TradeRoleUpgradeContentProps> = ({
  onClose,
  onConfirmRole,
}) => {
  return (
    <DialogContent className="custom-ui-alert-popup danger-alert-popup">
      <DialogHeader className="alert-popup-headerpart">
        <h1 className="text-center !text-3xl">Update trade role</h1>
      </DialogHeader>
      <DialogDescription className="text-center !text-2xl !text-black">
        Kindly select your preferred role
      </DialogDescription>
      <DialogFooter className="alert-actions !justify-center">
        <div className="alert-actions-col">
          <Button
            onClick={() => onConfirmRole("FREELANCER")}
            className="alert--submit-btn !bg-red-500 !text-lg"
          >
            Freelancer
          </Button>
        </div>
        <div className="alert-actions-col">
          <Button
            onClick={() => onConfirmRole("COMPANY")}
            className="alert--submit-btn !bg-red-500 !text-lg"
          >
            Company
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

export default TradeRoleUpgradeContent;
