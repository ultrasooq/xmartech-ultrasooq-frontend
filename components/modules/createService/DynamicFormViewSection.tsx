/**
 * @file DynamicFormViewSection.tsx
 * @description Section that renders dynamic forms associated with a service's category.
 * Fetches form definitions (custom fields) linked to the selected category and
 * renders them using the shared `DynamicForm` component. Supports field types:
 * text, textarea, dropdown, checkbox, radio, and date. Displays a fallback
 * message when no dynamic forms are available.
 */

import DynamicForm from "@/components/shared/DynamicForm";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import React from "react";

/** Props for the DynamicFormViewSection component. */
type DynamicFormViewSectionProps = {
  dynamicFormList: any;
};

const DynamicFormViewSection: React.FC<DynamicFormViewSectionProps> = ({
  dynamicFormList,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();

  return (
    <div className="grid w-full grid-cols-1 gap-x-5">
      <div className="col-span-3 mb-3 w-full rounded-lg border border-solid border-gray-300 bg-white p-6 shadow-xs sm:p-4 lg:p-8">
        {!dynamicFormList?.length ? (
          <p className="text-center" dir={langDir} translate="no">{t("no_form_found")}</p>
        ) : null}

        <div className="space-y-5">
          {dynamicFormList?.map(
            (form: {
              categoryId: number;
              // categoryLocation: null;
              createdAt: string;
              deletedAt: string | null;
              formId: number;
              formIdDetail: any;
              id: number;
              status: string;
              updatedAt: string;
            }) => <DynamicForm key={form.id} form={form} />,
          )}
        </div>
      </div>
    </div>
  );
};

export default DynamicFormViewSection;
