import React from "react";
import { DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import FreelancerIcon from "@/public/images/freelancer.svg";
import CompanyIcon from "@/public/images/company.svg";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

/**
 * Props for the {@link TradeRoleUpgradeContent} dialog component.
 *
 * @property onClose - Optional callback invoked to close the dialog.
 * @property onConfirmRole - Callback fired when the user selects a vendor
 *   role. Receives either `"COMPANY"` or `"FREELANCER"`.
 */
type TradeRoleUpgradeContentProps = {
  onClose?: () => void;
  onConfirmRole: (args0: "COMPANY" | "FREELANCER") => void;
};

/**
 * Dialog content that lets a buyer upgrade their trade role to either
 * "FREELANCER" or "COMPANY".
 *
 * Renders two radio-style selector cards with icons. Selecting either
 * option immediately invokes {@link TradeRoleUpgradeContentProps.onConfirmRole}
 * with the chosen role string.
 *
 * @param props - {@link TradeRoleUpgradeContentProps}
 * @returns A dialog content element with role-selection UI.
 */
const TradeRoleUpgradeContent: React.FC<TradeRoleUpgradeContentProps> = ({
  onClose,
  onConfirmRole,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  return (
    <DialogContent className="custom-action-type-chose-picker">
      <div className="modal-headerpart">
        <h5 dir={langDir} translate="no">{t("select_your_preferred_role")}</h5>
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
                <h5 dir={langDir} translate="no">{t("freelancer")}</h5>
                <p></p>
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
                <h5 dir={langDir} translate="no">{t("company")}</h5>
                <p></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
};

export default TradeRoleUpgradeContent;
