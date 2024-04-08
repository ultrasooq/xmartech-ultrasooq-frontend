import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input, InputProps } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

interface ControlledTextnputProps extends InputProps {
  label: string;
  name: string;
}

const ControlledTextInput: React.FC<ControlledTextnputProps> = ({
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
            <Input {...props} className="theme-form-control-s1" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledTextInput;
