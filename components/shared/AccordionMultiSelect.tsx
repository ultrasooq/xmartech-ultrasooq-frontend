import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { useFormContext } from "react-hook-form";

interface ISelectProps {
  label: string;
  name: string;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  error?: string;
}

const AccordionMultiSelect = ({
  label,
  name,
  options = [],
  placeholder,
  error,
}: ISelectProps) => {
  const formContext = useFormContext();
  const [selectedItems, setSelectedItems] = useState<
    {
      label: string;
      value: string | number;
    }[]
  >([]);

  const handleSelectChange = (item: { label: string; value: string }) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems((prev) => [...prev, item]);
    } else {
      const referencedArray = [...selectedItems];
      const indexOfItemToBeRemoved = referencedArray.indexOf(item);
      referencedArray.splice(indexOfItemToBeRemoved, 1);
      setSelectedItems(referencedArray);
    }
  };

  const isOptionSelected = (item: { label: string; value: string }): boolean =>
    selectedItems.includes(item) ? true : false;

  const watchSelectedItems = formContext.getValues(name);

  useEffect(() => {
    formContext.setValue(name, selectedItems);
  }, [watchSelectedItems]);

  return (
    <>
      <label className="mb-3 block text-left text-sm font-medium leading-5 text-color-dark">
        {label}
      </label>

      <Accordion
        type="single"
        collapsible
        className="mb-4 w-full rounded border border-solid border-gray-300"
      >
        <AccordionItem value="item-1" className="border-b-0 px-5">
          <AccordionTrigger className="flex h-auto min-h-[65px] justify-between py-0 hover:!no-underline">
            <div className="my-2 flex flex-wrap">
              {selectedItems.length ? (
                selectedItems.map((item) => (
                  <p
                    key={item.value}
                    className="my-1 mr-2 inline-flex items-center justify-between rounded bg-zinc-100 px-3.5 py-3 text-sm font-normal capitalize leading-4 text-dark-cyan"
                  >
                    {item.label}
                  </p>
                ))
              ) : (
                <p className="capitalize">Select {placeholder}</p>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              {options.map((option) => (
                <FormField
                  key={option.value}
                  control={formContext.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem className="mb-4 mr-4 flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={isOptionSelected(option)}
                          onCheckedChange={() => {
                            handleSelectChange(option);
                            field.onChange(option.value);
                          }}
                          className="data-[state=checked]:!bg-dark-orange"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-light-gray">
                          {option.label}
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <p className="text-[13px] text-red-500">{error}</p>
    </>
  );
};

export default AccordionMultiSelect;
