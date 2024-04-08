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

interface ControlledSelectInputProps {
  label: string;
  name: string;
  options: { label: string; value: string; icon?: string }[];
}

const ControlledSelectInput: React.FC<ControlledSelectInputProps> = ({
  label,
  name,
  options,
}) => {
  const formContext = useFormContext();

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4 mt-3">
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="!h-12 rounded border-gray-300 focus-visible:!ring-0 data-[placeholder]:text-muted-foreground">
                <SelectValue placeholder="Select Social Media" />
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
