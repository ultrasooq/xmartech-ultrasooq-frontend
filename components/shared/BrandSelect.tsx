import { useBrands, useCreateBrand } from "@/apis/queries/masters.queries";
import { IBrands, IOption } from "@/utils/types/common.types";
import React, { useMemo, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useToast } from "../ui/use-toast";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";

const customStyles = {
  control: (base: any) => ({ ...base, height: 48, minHeight: 48, }),
};

const ReactSelectInput = () => {
  const formContext = useFormContext();
  const { toast } = useToast();
  const [, setValue] = useState<IOption | null>();

  const brandsQuery = useBrands({});
  const createBrand = useCreateBrand();

  const memoizedBrands = useMemo(() => {
    return brandsQuery?.data?.data.map((item: IBrands) => ({ label: item.brandName, value: item.id })) || [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brandsQuery?.data?.data?.length]);

  const handleCreate = async (inputValue: string) => {
    const response = await createBrand.mutateAsync({ brandName: inputValue });

    if (response.status && response.data) {
      toast({ title: "Brand Create Successful", description: response.message, variant: "success", });
      setValue({ label: response.data.brandName, value: response.data.id, });
      formContext.setValue("brandId", response.data.id);
    } else {
      toast({ title: "Brand Create Failed", description: response.message, variant: "danger", });
    }
  };

  const brandType = [{ label: 'Brand', value: 'BRAND' }, { label: 'Spare part', value: 'SPAREPART' }, { label: 'Own brand', value: 'OWNBRAND' }]

  return (
    <>
      <div className="mt-2 flex flex-col gap-y-3">
        <Label>Brand Type</Label>
        <Controller name="brandType" control={formContext.control} render={({ field }) => (
          <CreatableSelect {...field} isClearable isDisabled={createBrand.isPending} isLoading={createBrand.isPending} onCreateOption={handleCreate} options={brandType} styles={customStyles} instanceId="brandId"
            onChange={(newValue) => {
              field.onChange(newValue?.value);
              setValue(newValue);
            }}
            value={brandType.find((item: IOption) => item.value === field.value,)} />
        )} />
        <p className="text-[13px] text-red-500">
          {formContext.formState.errors["brandType"]?.message as string}
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-y-3">
        <Label>Brand</Label>
        <Controller name="brandId" control={formContext.control} render={({ field }) => (
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
              (item: IOption) => item.value === field.value,
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
    </>
  );
};

export default ReactSelectInput;
