"use client";

import React from "react";
import sanitizeHtml from "@/utils/sanitizeHtml";

interface PlateEditorProps {
  description?: string;
  readOnly?: boolean;
  fixedToolbar?: boolean;
  [key: string]: any;
}

const PlateEditorSimple: React.FC<PlateEditorProps> = ({
  description,
  readOnly = false,
  fixedToolbar = false,
  ...props
}) => {
  const safeHtml = sanitizeHtml(description || "");

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{
        __html: safeHtml,
      }}
      {...props}
    />
  );
};

export default PlateEditorSimple;
