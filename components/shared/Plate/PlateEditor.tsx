/**
 * @file PlateEditor - HTML content renderer using dangerouslySetInnerHTML.
 * @description Renders rich text content by injecting an HTML string via
 * dangerouslySetInnerHTML into a prose-styled container div. Despite the name
 * suggesting a Plate.js editor, this component functions as a read-only HTML
 * renderer. The readOnly and fixedToolbar props are accepted but not currently
 * used in the rendering logic. Spreads additional props onto the wrapper div.
 *
 * @props
 *   - description {string} - HTML string content to render (default "").
 *   - readOnly {boolean} - Accepted but unused (default false).
 *   - fixedToolbar {boolean} - Accepted but unused (default false).
 *   - [key: string]: any - Additional props spread onto the wrapper div.
 *
 * @dependencies None (pure React component).
 */
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
