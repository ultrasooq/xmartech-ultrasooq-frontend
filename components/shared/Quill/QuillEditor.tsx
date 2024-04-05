import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
// import ReactQuill from "react-quill";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type QuillEditorProps = {
  onChange: (value: string) => void;
  description: string;
};

const QuillEditor: React.FC<QuillEditorProps> = ({ onChange, description }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(description || "");
  }, [description]);

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={(e) => {
        setValue(e);
        onChange(e);
      }}
    />
  );
};

export default QuillEditor;
