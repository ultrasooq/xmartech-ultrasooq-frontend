/**
 * @file DynamicFormViewSection.tsx
 * @description Renders dynamic forms that are linked to a product's category.
 *   Iterates over a list of form definitions and renders each one using the
 *   shared DynamicForm component. Shows "no form found" when no forms are
 *   available for the current category.
 *
 * @props
 *   - dynamicFormList {any} - Array of dynamic form objects, each containing
 *     categoryId, formId, formIdDetail (form definition), status, and timestamps.
 *
 * @behavior
 *   - Maps over the `dynamicFormList` array and renders a `DynamicForm` component
 *     for each entry.
 *   - Displays a centered "no form found" message when the list is empty.
 *   - Each form entry includes metadata like categoryId, formId, status, and
 *     the full form definition in formIdDetail.
 *
 * @dependencies
 *   - DynamicForm (shared component) - Renders individual dynamic form instances.
 *   - useAuth (AuthContext) - Language direction for RTL support.
 *   - useTranslations (next-intl) - i18n translations.
 */
import DynamicForm from "@/components/shared/DynamicForm";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import React from "react";

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
