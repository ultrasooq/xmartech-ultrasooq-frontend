import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ControlledTimePickerProps {
  label?: string;
  name: string;
}

const generateTimeOptions = () => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      times.push(time);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

const ControlledTimePicker: React.FC<ControlledTimePickerProps> = ({ label, name }) => {
  const { control, setValue, watch } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
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
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? field.value : <span>Select {label || "Time"}</span>}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 max-h-64 overflow-y-auto" align="start">
              <select
                className="w-full border border-gray-300 rounded-lg p-2 text-lg cursor-pointer"
                value={field.value || ""}
                onChange={(e) => {
                  const selectedTime = e.target.value;
                  setValue(name, selectedTime); // ✅ Update form state
                  field.onChange(selectedTime); // ✅ Call field.onChange
                  // console.log(`Updated ${name}:`, selectedTime); // ✅ Debugging log
                }}
              >
                <option value="" disabled>
                  Select Time
                </option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledTimePicker;
