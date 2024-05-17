import { useBrands, useCreateBrand } from "@/apis/queries/masters.queries";
import { IBrands } from "@/utils/types/common.types";
import React, { useMemo, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useToast } from "../ui/use-toast";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";

interface Option {
  readonly label: string;
  readonly value: string;
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    height: 48,
    minHeight: 48,
  }),
};

const ReactSelectInput = () => {
  const formContext = useFormContext();
  const { toast } = useToast();
  const [value, setValue] = useState<Option | null>();

  const brandsQuery = useBrands({});
  const createBrand = useCreateBrand();

  const memoizedBrands = useMemo(() => {
    return (
      brandsQuery?.data?.data.map((item: IBrands) => {
        return { label: item.brandName, value: item.id };
      }) || []
    );
  }, [brandsQuery?.data?.data?.length]);

  const handleCreate = async (inputValue: string) => {
    const response = await createBrand.mutateAsync({ brandName: inputValue });

    if (response.status && response.data) {
      toast({
        title: "Brand Create Successful",
        description: response.message,
        variant: "success",
      });
      setValue({
        label: response.data.brandName,
        value: response.data.id,
      });
      formContext.setValue("brandId", response.data.id);
    } else {
      toast({
        title: "Brand Create Failed",
        description: response.message,
        variant: "danger",
      });
    }
  };

  return (
    <div className="mt-2 flex flex-col gap-y-3">
      <Label>Brand</Label>
      <Controller
        name="brandId"
        control={formContext.control}
        render={({ field }) => (
          <CreatableSelect
            {...field}
            isClearable
            isDisabled={createBrand.isPending}
            isLoading={createBrand.isPending}
            onChange={(newValue) => {
              field.onChange(newValue?.value);
              setValue(newValue);
            }}
            onCreateOption={handleCreate}
            options={memoizedBrands}
            value={memoizedBrands.find(
              (item: Option) => item.value === field.value,
            )}
            styles={customStyles}
            instanceId="brandId"
          />
        )}
      />
      <p className="text-[13px] text-red-500">
        {formContext.formState.errors["brandId"]?.message as string}
      </p>
    </div>
  );
};

export default ReactSelectInput;
