/**
 * @file PlateEditorSimple - Simplified HTML content renderer using dangerouslySetInnerHTML.
 * @description A simplified variant of PlateEditor that renders rich text content
 * by injecting an HTML string via dangerouslySetInnerHTML into a prose-styled
 * container div. Functionally identical to PlateEditor but exported as a separate
 * component for use cases requiring a distinct component reference. The readOnly
 * and fixedToolbar props are accepted but not currently used.
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

const PlateEditorSimple: React.FC<PlateEditorProps> = ({
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

export default PlateEditorSimple;
