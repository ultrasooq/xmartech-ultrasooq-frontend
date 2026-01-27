/**
 * @file SelectInput - Standalone select dropdown component (uncontrolled).
 * @description Renders a simple labeled select dropdown using the Shadcn Select primitive.
 * Unlike ControlledSelectInput, this is not integrated with React Hook Form
 * and manages its own state via Radix Select props.
 *
 * @props
 *   - label {string} - Used to generate the placeholder text ("Select {label}").
 *   - options {{ label: string; value: string }[]} - Available select options.
 *   - Plus all Radix SelectPrimitive.SelectProps (value, onValueChange, etc.).
 *
 * @dependencies
 *   - @/components/ui/select - Select dropdown primitives.
 *   - @radix-ui/react-select - Radix select types.
 */
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as SelectPrimitive from "@radix-ui/react-select";

interface SelectInputProps extends SelectPrimitive.SelectProps {
  label: string;
  options: { label: string; value: string }[];
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  options,
  ...props
}) => {
  return (
    <Select {...props}>
      <SelectTrigger className="theme-form-control-s1 data-placeholder:text-muted-foreground">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            <div className="flex flex-row items-center py-2">
              <span>{item.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectInput;
