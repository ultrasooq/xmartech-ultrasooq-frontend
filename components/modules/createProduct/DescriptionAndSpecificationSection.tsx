import React from "react";
import ControlledRichTextEditor from "@/components/shared/Forms/ControlledRichTextEditor";

const DescriptionAndSpecificationSection = () => {
  return (
    <div className="flex w-full flex-wrap">
      <h3>Description & Specification</h3>
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
