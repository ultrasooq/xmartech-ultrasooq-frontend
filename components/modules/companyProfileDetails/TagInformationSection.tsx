import React from "react";
type TagInformationSectionProps = {
  tagDetails: any;
};

const TagInformationSection: React.FC<TagInformationSectionProps> = ({
  tagDetails,
}) => {
  return (
    <div className="mt-6 w-full pb-5">
      <div className="w-full">
        <label className="block text-lg font-semibold leading-5 text-color-dark">
          Tag
        </label>
        <div className="flex w-full flex-wrap">
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
