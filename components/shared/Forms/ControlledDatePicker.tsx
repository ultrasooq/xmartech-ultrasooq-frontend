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
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";

interface ControlledDatePickerProps {
  label?: string;
  name: string;
  isFuture?: boolean;
  minDate?: Date;
  placeholder?: string;
}

const ControlledDatePicker: React.FC<ControlledDatePickerProps> = ({
  label,
  name,
  isFuture,
  minDate,
  placeholder
}) => {
  const t = useTranslations();
  const formContext = useFormContext();
  const { langDir } = useAuth();

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          {label && (
            <FormLabel className="text-sm font-medium text-gray-700" dir={langDir}>
              {label}
            </FormLabel>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 px-4 py-3 bg-white border border-gray-300 rounded-xl text-sm text-left font-normal hover:bg-gray-50 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200",
                    !field.value && "text-gray-500"
                  )}
                  dir={langDir}
                  translate="no"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        placeholder || t("enter") + " " + (label || t("date"))
                      )}
                    </span>
                    <CalendarIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-0 bg-white shadow-xl border border-gray-200 rounded-xl" 
              align={langDir === 'rtl' ? 'end' : 'start'}
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);

                  if (isFuture) {
                    return date < today || (minDate ? date < minDate : false);
                  } else {
                    const minSelectableDate = new Date("1900-01-01");
                    return (
                      date < minSelectableDate ||
                      date > today ||
                      (minDate ? date < minDate : false)
                    );
                  }
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
                  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4 p-4",
                  caption: "flex justify-center pt-1 relative items-center mb-4",
                  caption_label: "text-lg font-semibold text-gray-900",
                  caption_dropdowns: "flex justify-center gap-2",
                  nav: "space-x-1 flex items-center",
                  nav_button: cn(
                    "h-8 w-8 bg-white border border-gray-300 rounded-lg p-0 hover:bg-orange-50 hover:border-orange-300 transition-colors"
                  ),
                  nav_button_previous: "absolute left-2",
                  nav_button_next: "absolute right-2",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex mb-2",
                  head_cell: "text-gray-600 rounded-md w-10 font-medium text-sm text-center",
                  row: "flex w-full mt-1",
                  cell: "text-center text-sm p-0 relative hover:bg-orange-50 rounded-lg transition-colors",
                  day: cn(
                    "h-10 w-10 p-0 font-normal rounded-lg hover:bg-orange-100 hover:text-orange-900 transition-colors"
                  ),
                  day_selected: "bg-orange-500 text-white hover:bg-orange-600 hover:text-white focus:bg-orange-600 focus:text-white",
                  day_today: "bg-blue-100 text-blue-900 font-semibold",
                  day_outside: "text-gray-400 opacity-50",
                  day_disabled: "text-gray-300 opacity-30 cursor-not-allowed",
                  day_range_middle: "aria-selected:bg-orange-100 aria-selected:text-orange-900",
                  day_hidden: "invisible",
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage className="text-sm text-red-500" />
        </FormItem>
      )}
    />
  );
};

export default ControlledDatePicker;