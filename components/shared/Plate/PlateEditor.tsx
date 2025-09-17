"use client";

import React from "react";

interface PlateEditorProps {
  description?: string;
  readOnly?: boolean;
  fixedToolbar?: boolean;
  [key: string]: any;
}

const PlateEditor: React.FC<PlateEditorProps> = ({
  description,
  readOnly = false,
  fixedToolbar = false,
  ...props
}) => {
  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{
        __html: description || "",
      }}
      {...props}
    />
  );
};

export default PlateEditor;
