import React from "react";
import ControlledRichTextEditor from "@/components/shared/Forms/ControlledRichTextEditor";

const DescriptionAndSpecificationSection = () => {
  return (
    <div className="flex w-full flex-wrap">
      <div className="mb-4 w-full">
        <div className="mt-2.5 w-full">
          <label className="mb-3.5 block text-left text-lg font-medium capitalize leading-5 text-color-dark">
            Description & Specification
          </label>
        </div>
      </div>
      <div className="mb-3.5 w-full">
        <div className="relative mb-4 w-full">
          <ControlledRichTextEditor label="Description" name="description" />
        </div>
        <div className="relative mb-4 w-full">
          <ControlledRichTextEditor
            label="Specification"
            name="specification"
          />
        </div>
      </div>
    </div>
  );
};

export default DescriptionAndSpecificationSection;
