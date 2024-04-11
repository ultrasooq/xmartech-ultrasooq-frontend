import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import Image from "next/image";
import { ControlledSelectOptions } from "@/utils/types/common.types";

interface ControlledSelectInputProps {
  label: string;
  name: string;
  options: ControlledSelectOptions[];
}

const ControlledSelectInput: React.FC<ControlledSelectInputProps> = ({
  label,
  name,
  options,
  ...props
}) => {
  const formContext = useFormContext();

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} value={field.value} {...props}>
            <FormControl>
              <SelectTrigger className="theme-form-control-s1 data-[placeholder]:text-muted-foreground">
                <SelectValue placeholder={`Select ${label}`} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  <div className="flex flex-row items-center py-2">
                    {item.icon ? (
                      <Image
                        src={item.icon}
                        className="mr-2"
                        width={20}
                        height={20}
                        alt="social-icon"
                      />
                    ) : null}

                    <span>{item.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledSelectInput;
