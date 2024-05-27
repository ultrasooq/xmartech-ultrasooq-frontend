import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type CounterTextInputFieldProps = {
  name: string;
  label: string;
  placeholder: string;
};

const CounterTextInputField: React.FC<CounterTextInputFieldProps> = ({
  name,
  label,
  placeholder,
}) => {
  const formContext = useFormContext();
  const [counter, setCounter] = useState(0);

  return (
    <FormField
      control={formContext.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <button
                type="button"
                className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                onClick={() => setCounter(counter - 1)}
                disabled={counter === 0}
              >
                -
              </button>
              <Input
                type="number"
                onWheel={(e) => e.currentTarget.blur()}
                placeholder={placeholder}
                className="!h-[48px] rounded border-gray-300 px-12 focus-visible:!ring-0"
                {...field}
                value={counter}
                onChange={(e) => {
                  setCounter(Number(e.target.value));
                  field.onChange(e);
                }}
              />
              <button
                type="button"
                className="absolute right-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]"
                onClick={() => setCounter(counter + 1)}
              >
                +
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CounterTextInputField;
