/**
 * @file TagInformationSection.tsx
 * @description Simple tag display section for the company profile page. Renders
 *   a list of user branch tags as styled badge elements.
 *
 * @props
 *   - tagDetails {any} - Object containing `userBranchTags` array, where each
 *     tag has `id` and `tag` (display text) properties.
 *
 * @behavior
 *   - Renders a "Tag" heading and maps over `tagDetails.userBranchTags` to
 *     display each tag as a gray badge with cyan text.
 *   - Supports RTL layout via `langDir` from AuthContext.
 *
 * @dependencies
 *   - useAuth (AuthContext) - Language direction.
 *   - useTranslations (next-intl) - i18n translations.
 */
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import React from "react";
type TagInformationSectionProps = {
  tagDetails: any;
};

const TagInformationSection: React.FC<TagInformationSectionProps> = ({
  tagDetails,
}) => {
  const t = useTranslations();
  const { langDir } = useAuth();

  return (
    <div className="mt-6 w-full pb-5">
      <div className="w-full">
        <label className="block text-lg font-semibold leading-5 text-color-dark" dir={langDir} translate="no">
          {t("tag")}
        </label>
        <div className="flex w-full flex-wrap" dir={langDir}>
          {tagDetails?.userBranchTags?.map((item: any) => (
            <span
              key={item.id}
              className="mr-4 mt-4 inline-block rounded bg-gray-300 p-4 py-2.5 text-base font-medium leading-5 text-dark-cyan"
            >
              {item?.userBranchTagsTag?.tagName}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TagInformationSection;
