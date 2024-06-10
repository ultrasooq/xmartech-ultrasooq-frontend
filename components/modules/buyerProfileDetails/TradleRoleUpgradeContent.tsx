import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import FreelancerIcon from "@/public/images/freelancer.svg";
import CompanyIcon from "@/public/images/company.svg";

type TradeRoleUpgradeContentProps = {
  onClose?: () => void;
  onConfirmRole: (args0: "COMPANY" | "FREELANCER") => void;
};

const TradeRoleUpgradeContent: React.FC<TradeRoleUpgradeContentProps> = ({
  onClose,
  onConfirmRole,
}) => {
  return (
    <DialogContent className="custom-action-type-chose-picker">
      <div className="modal-headerpart">
        <h5>Kindly select your preferred role</h5>
      </div>
      <div className="modal-bodypart">
        <div className="import-pickup-type-selector-lists">
          <div className="import-pickup-type-selector-item">
            <input
              type="radio"
              className="select-controller"
              onClick={() => onConfirmRole("FREELANCER")}
              name="roleType"
            />
            <div className="import-pickup-type-selector-box">
              <div className="icon-container">
                <Image src={FreelancerIcon} alt="freelancer-icon" />
              </div>
              <div className="text-container">
                <h5>Freelancer</h5>
                <p>
                  Lorem Ipsum is simply Lorem 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </div>
          </div>
          <div className="import-pickup-type-selector-item">
            <input
              type="radio"
              className="select-controller"
              onClick={() => onConfirmRole("COMPANY")}
              name="roleType"
            />
            <div className="import-pickup-type-selector-box">
              <div className="icon-container">
                <Image src={CompanyIcon} alt="company-icon" />
              </div>
              <div className="text-container">
                <h5>Company</h5>
                <p>
                  Lorem Ipsum is simply Lorem 1500s, when an unknown printer
                  took a galley of type and scrambled it to make a type specimen
                  book.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default TradeRoleUpgradeContent;
