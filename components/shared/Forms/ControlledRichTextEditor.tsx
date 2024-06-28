import React from "react";
// import Tiptap from "../Rte/Tiptap";
// import QuillEditor from "../Quill/QuillEditor";
import { Controller, useFormContext } from "react-hook-form";
import PlateEditor from "../Plate/PlateEditor";

interface ControlledRichTextEditorProps {
  label: string;
  name: string;
}

const ControlledRichTextEditor: React.FC<ControlledRichTextEditorProps> = ({
  label,
  name,
}) => {
  const formContext = useFormContext();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none text-color-dark">
        {label}
      </label>
      <Controller
        control={formContext.control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          // <Tiptap onChange={field.onChange} description={field.value} />
          // <QuillEditor onChange={field.onChange} description={field.value} />
          <PlateEditor onChange={field.onChange} description={field.value} />
        )}
      />
    </div>
  );
};

export default ControlledRichTextEditor;
