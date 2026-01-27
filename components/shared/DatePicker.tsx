/**
 * @file DatePicker - Standalone date picker component using a popover calendar.
 * @description Renders a button trigger that opens a popover with a Calendar component.
 * The selected date is displayed in "PPP" format (e.g., "January 27th, 2026").
 * Manages its own internal date state.
 *
 * @props
 *   - placeholder {string} - Custom placeholder text (default: "Pick a date").
 *
 * @dependencies
 *   - date-fns (format) - Date formatting utility.
 *   - lucide-react (Calendar icon) - Calendar trigger icon.
 *   - @/components/ui/button - Styled button trigger.
 *   - @/components/ui/calendar - Calendar day picker.
 *   - @/components/ui/popover - Popover container for the calendar.
 *   - @/lib/utils (cn) - Tailwind class merging utility.
 */
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type DatePickerProps = {
  placeholder?: string;
};

const DatePicker: React.FC<DatePickerProps> = ({ placeholder }) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline-solid"}
          className={cn(
            "h-12! justify-start rounded border-gray-300 pl-3 text-left font-normal focus-visible:ring-0!",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{`${placeholder || "Pick a date"}`}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default DatePicker;
