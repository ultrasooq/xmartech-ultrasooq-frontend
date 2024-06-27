import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ControlledDatePickerProps {
  label?: string;
  name: string;
  isFuture?: boolean;
}

const ControlledDatePicker: React.FC<ControlledDatePickerProps> = ({
  label,
  name,
  isFuture,
}) => {
  const formContext = useFormContext();

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4 flex w-full flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "!h-12 rounded border-gray-300 pl-3 text-left font-normal focus-visible:!ring-0",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Enter {label || "Date"}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => {
                  return isFuture
                    ? date <= new Date()
                    : date > new Date() || date < new Date("1900-01-01");
                }}
                initialFocus
                fromYear={
                  isFuture
                    ? new Date().getFullYear()
                    : new Date().getFullYear() - 100
                }
                toYear={
                  isFuture
                    ? new Date().getFullYear() + 100
                    : new Date().getFullYear() - 18
                }
                captionLayout="dropdown-buttons"
                classNames={{
                  vhidden: "vhidden hidden",
                  day_selected: "bg-dark-orange text-white",
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledDatePicker;
