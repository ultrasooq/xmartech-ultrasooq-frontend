import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";

/**
 * Props for the {@link Operations} sidebar component.
 *
 * @property onSelect - Callback fired when an operation tab is selected,
 *   receiving the operation key string (e.g., `"questions_n_comments"`).
 */
type OperationsProps = {
  onSelect: (operation: string) => void;
};

/** Shape of a single operation tab entry. */
type Operation = {
  key: string;
  label: string;
};

/**
 * Sidebar navigation for the vendor operations panel. Renders a list
 * of operation tabs (currently only "Questions & Comments" is active).
 * Selecting a tab invokes `onSelect` with the operation key.
 *
 * @param props - {@link OperationsProps}
 * @returns A sidebar element with operation tab buttons.
 */
const Operations: React.FC<OperationsProps> = ({ onSelect }) => {
  const t = useTranslations();
  const { langDir } = useAuth();
  const [selectedOperation, setSelectedOperation] = useState<string>(
    "questions_n_comments",
  );

  const operations: Operation[] = [
    // {
    //   key: "admin_n_support",
    //   label: "Admin & Support",
    // },
    {
      key: "questions_n_comments",
      label: t("question_n_comments"),
    },
    // {
    //   key: "rate_n_review",
    //   label: "Rate & Review",
    // },
    // {
    //   key: "complains",
    //   label: "Complains",
    // },
  ];

  const selectOperation = (operation: string) => {
    setSelectedOperation(operation);
    onSelect(operation);
  };

  return (
    <div className="w-full border-r border-solid border-gray-300 lg:w-[15%]">
      <div
        className="flex min-h-[55px] w-full items-center border-b border-solid border-gray-300 px-[10px] py-[10px] text-base font-normal text-[#333333]"
        dir={langDir}
      >
        <span translate="no">{t("vendor_operations")}</span>
      </div>

      <div className="h-auto w-full overflow-y-auto p-4 lg:h-[720px]">
        {operations.map((operation: any) => (
          <button
            type="button"
            onClick={() => selectOperation(operation.key)}
            className={cn(
              "flex w-full flex-wrap rounded-md px-[10px] py-[20px]",
              selectedOperation == operation.key
                ? "bg-dark-orange text-white shadow-lg"
                : "",
            )}
            key={operation.key}
          >
            <div className="flex w-[calc(100%-2.5rem)] flex-wrap items-center justify-start gap-y-1 whitespace-pre-wrap break-all lg:w-full xl:pl-3">
              <div className="flex w-full">
                <h4 className="text-color-[#333333] text-left text-[13px] font-normal uppercase xl:text-[14px]">
                  {operation.label}
                </h4>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Operations;
