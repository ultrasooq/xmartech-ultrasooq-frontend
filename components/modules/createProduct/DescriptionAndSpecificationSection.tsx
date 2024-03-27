import Tiptap from "@/components/shared/Rte/Tiptap";
import React from "react";

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
        <div className="flex flex-wrap">
          <div className="relative mb-4 w-full">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-color-dark">
                Description
              </label>
              <Tiptap />
              {/* <textarea className="!h-[200px] w-full resize-none rounded border !border-gray-300 px-3 py-1 text-sm focus:outline-none"></textarea> */}
            </div>
          </div>
          <div className="relative mb-4 w-full">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-color-dark">
                Specification
              </label>
              <Tiptap />
              {/* <textarea className="!h-[200px] w-full resize-none rounded border !border-gray-300 px-3 py-1 text-sm focus:outline-none"></textarea> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionAndSpecificationSection;
