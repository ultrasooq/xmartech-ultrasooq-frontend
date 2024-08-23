import { useBrands, useCreateBrand } from "@/apis/queries/masters.queries";
import { IBrands, IOption } from "@/utils/types/common.types";
import React, { useEffect, useMemo, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useToast } from "../ui/use-toast";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { useAuth } from "@/context/AuthContext";

const customStyles = {
  control: (base: any) => ({ ...base, height: 48, minHeight: 48, }),
};

const ReactSelectInput = () => {
  const formContext = useFormContext();
  const { toast } = useToast();
  const [, setValue] = useState<IOption | null>();

  const [productType, setProductType] = useState<string | undefined>()

  const { user } = useAuth();

  const brandsQuery = useBrands({ addedBy: user?.id, type: productType });
  const createBrand = useCreateBrand();

  const memoizedBrands = useMemo(() => {
    return productType ? brandsQuery?.data?.data.map((item: IBrands) => ({ label: item.brandName, value: item.id })) || [] : [];
  }, [brandsQuery?.data?.data, productType]);

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
        <Label>Product Type</Label>
        <Controller name="typeOfProduct" control={formContext.control} render={({ field }) => (
          <CreatableSelect {...field} isClearable options={brandType} styles={customStyles} instanceId="typeOfProduct" value={brandType.find((item: IOption) => item.value === field.value,)}
            onChange={(newValue) => {
              field.onChange(newValue?.value);
              if (newValue?.value) {
                setProductType(newValue?.value)
              }
            }}
          />
        )} />
        <p className="text-[13px] text-red-500">
          {formContext.formState.errors["typeOfProduct"]?.message as string}
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
