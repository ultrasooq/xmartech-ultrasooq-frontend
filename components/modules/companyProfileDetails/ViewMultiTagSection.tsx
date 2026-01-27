/**
 * @file ViewMultiTagSection.tsx
 * @description Category tag display section used within branch detail cards.
 *   Renders branch category names as styled badge elements in a flex-wrap layout.
 *
 * @props
 *   - categoryDetails {any} - Array of branch category objects, each containing
 *     `id` and `userBranchCategory_category.categoryName` for display.
 *
 * @behavior
 *   - Renders a "Categories" heading and maps over `categoryDetails` array.
 *   - Each category is displayed as a gray badge with the category name.
 *   - Supports RTL layout via `langDir` from AuthContext.
 *
 * @dependencies
 *   - useAuth (AuthContext) - Language direction.
 *   - useTranslations (next-intl) - i18n translations.
 */
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import React from "react";

type ViewMultiTagSectionProps = {
  categoryDetails: any;
};

const ViewMultiTagSection: React.FC<ViewMultiTagSectionProps> = ({
  categoryDetails,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();

  return (
    <div className="mt-6 w-full pb-5">
      <div className="w-full">
        <label className="block text-lg font-semibold leading-5 text-color-dark" dir={langDir} translate="no">
          {t("categories")}
        </label>
        <div className="flex w-full flex-wrap" dir={langDir}>
          {categoryDetails?.map((item: any) => (
            <span
              key={item.id}
              className="mr-4 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5 text-dark-cyan"
            >
              {item?.userBranchCategory_category?.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewMultiTagSection;
