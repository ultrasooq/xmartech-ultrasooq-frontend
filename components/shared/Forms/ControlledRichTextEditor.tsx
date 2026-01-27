/**
 * @file ControlledRichTextEditor - React Hook Form integrated simple rich text editor.
 * @description Provides a textarea-based editor integrated with React Hook Form via
 * Controller and useFormContext. Includes a SimpleRichTextEditor internal component
 * that renders a resizable textarea with optional character limit counter. Handles
 * conversion between string and array formats for the "descriptionJson" field name.
 * Supports read-only mode and custom onChange handler override.
 *
 * @exports default ControlledRichTextEditor - The form-integrated editor wrapper.
 *
 * @props (ControlledRichTextEditor)
 *   - label {string} - Label text displayed above the editor.
 *   - name {string} - Form field name (special handling for "descriptionJson").
 *   - value {any[]} - Optional controlled value override.
 *   - onChange {(e: any) => void} - Optional custom change handler.
 *   - readOnly {boolean} - When true, makes the textarea read-only (default false).
 *   - maxLength {number} - Optional character limit with counter display.
 *
 * @dependencies
 *   - react-hook-form (Controller, useFormContext) - Form state management.
 *   - @/context/AuthContext (useAuth) - Language direction context.
 */
import { useAuth } from "@/context/AuthContext";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

// Simple rich text editor component
const SimpleRichTextEditor = ({
  value,
  onChange,
  readOnly = false,
  maxLength,
  ...props
}: any) => {
  const currentLength = (value || "").length;
  const isOverLimit = maxLength && currentLength > maxLength;
  
  return (
    <div className="relative">
      <textarea
        value={value || ""}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        readOnly={readOnly}
        maxLength={maxLength}
        className={`w-full min-h-[120px] p-3 border rounded-md resize-vertical focus:ring-2 focus:border-transparent ${
          isOverLimit 
            ? 'border-red-300 focus:ring-red-500' 
            : 'border-gray-300 focus:ring-blue-500'
        }`}
        placeholder="Enter description..."
        {...props}
      />
      <div className="mt-2 flex justify-between items-center">
        {!readOnly && (
          <div className="text-xs text-gray-500">
            You can use basic formatting. For advanced formatting, please use HTML tags.
          </div>
        )}
        {maxLength && (
          <div className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-gray-400'}`}>
            {currentLength}/{maxLength} characters
          </div>
        )}
      </div>
    </div>
  );
};

interface ControlledRichTextEditorProps {
  label: string;
  name: string;
  value?: any[];
  onChange?: (e: any) => void;
  readOnly?: boolean;
  maxLength?: number;
}

const ControlledRichTextEditor: React.FC<ControlledRichTextEditorProps> = ({
  label,
  name,
  value,
  onChange,
  readOnly = false,
  maxLength,
}) => {
  const formContext = useFormContext();
  const { langDir } = useAuth();

  return (
    <div className="space-y-2">
      <label
        className="text-color-dark text-sm leading-none font-medium"
        dir={langDir}
      >
        {label}
      </label>
      <Controller
        control={formContext.control}
        name={name}
        defaultValue={name === "descriptionJson" ? [] : ""}
        render={({ field }) => {
          // Convert between string and array formats based on field name
          const isDescriptionJson = name === "descriptionJson";
          
          // Get the current value - convert from array format if needed
          const currentValue = isDescriptionJson 
            ? (Array.isArray(field.value) ? field.value[0]?.children?.[0]?.text || "" : field.value || "")
            : (field.value || "");
          
          return (
            <SimpleRichTextEditor
              onChange={(newValue) => {
                if (onChange) {
                  onChange(newValue);
                } else {
                  // Convert string to array format for descriptionJson
                  if (isDescriptionJson) {
                    const arrayValue = newValue ? [{
                      type: "p",
                      children: [{ text: newValue }]
                    }] : [];
                    field.onChange(arrayValue);
                  } else {
                    field.onChange(newValue);
                  }
                }
              }}
              value={currentValue}
              readOnly={readOnly}
              maxLength={maxLength}
            />
          );
        }}
      />
    </div>
  );
};

export default ControlledRichTextEditor;
