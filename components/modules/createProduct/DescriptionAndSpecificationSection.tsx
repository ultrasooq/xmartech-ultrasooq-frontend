import QuillEditor from "@/components/shared/Quill/QuillEditor";
// import Tiptap from "@/components/shared/Rte/Tiptap";
import React from "react";
import { Controller } from "react-hook-form";

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
              <Controller
                name="description"
                defaultValue=""
                render={({ field }) => (
                  // <Tiptap onChange={field.onChange} description={field.value} />
                  <QuillEditor
                    onChange={field.onChange}
                    description={field.value}
                  />
                )}
              />
            </div>
          </div>
          <div className="relative mb-4 w-full">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-color-dark">
                Specification
              </label>
              <Controller
                name="specification"
                defaultValue=""
                render={({ field }) => (
                  // <Tiptap onChange={field.onChange} description={field.value} />
                  <QuillEditor
                    onChange={field.onChange}
                    description={field.value}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionAndSpecificationSection;
