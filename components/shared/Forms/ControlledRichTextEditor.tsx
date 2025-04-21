import React from "react";
// import Tiptap from "../Rte/Tiptap";
// import QuillEditor from "../Quill/QuillEditor";
import { Controller, useFormContext } from "react-hook-form";
import PlateEditor from "../Plate/PlateEditor";
import { useAuth } from "@/context/AuthContext";

interface ControlledRichTextEditorProps {
  label: string;
  name: string;
  value?: any[],
  onChange?: (e: any) => void;
}

const ControlledRichTextEditor: React.FC<ControlledRichTextEditorProps> = ({ label, name, value, onChange, }) => {
  const formContext = useFormContext();
  const { langDir } = useAuth();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none text-color-dark" dir={langDir}>
        {label}
      </label>
      <Controller
        control={formContext.control}
        name={name}
        defaultValue=""
        render={({ field }) => (
          // <Tiptap onChange={field.onChange} description={field.value} />
          // <QuillEditor onChange={field.onChange} description={field.value} />
          <PlateEditor 
            onChange={(e) => {
              if (onChange) {
                onChange(e);
              } else {
                field.onChange(e);
              }
            }} 
            description={value || field.value} />
        )}
      />
    </div>
  );
};

export default ControlledRichTextEditor;
