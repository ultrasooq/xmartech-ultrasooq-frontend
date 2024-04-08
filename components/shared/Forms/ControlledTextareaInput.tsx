import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea, TextareaProps } from "@/components/ui/textarea";

interface ControlledTextareaInputProps extends TextareaProps {
  label: string;
  name: string;
}

const ControlledTextareaInput: React.FC<ControlledTextareaInputProps> = ({
  label,
  name,
  ...props
}) => {
  const formContext = useFormContext();

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4 w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...props}
              className="theme-form-control-s1 !h-auto"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledTextareaInput;
