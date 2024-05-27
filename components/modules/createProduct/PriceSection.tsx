import React, { useMemo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import { Label } from "@/components/ui/label";
import CounterTextInputField from "./CounterTextInputField";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CONSUMER_TYPE_LIST,
  DELIVER_AFTER_LIST,
  SELL_TYPE_LIST,
} from "@/utils/constants";
import { ICountries, ILocations, IOption } from "@/utils/types/common.types";
import { useCountries, useLocation } from "@/apis/queries/masters.queries";

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
  menu: (base: any) => ({
    ...base,
    zIndex: 20,
  }),
};

type PriceSectionProps = {
  activeProductType?: string;
};

const PriceSection: React.FC<PriceSectionProps> = ({ activeProductType }) => {
  const formContext = useFormContext();

  const countriesQuery = useCountries();
  const locationsQuery = useLocation();

  const watchSetUpPrice = formContext.watch("setUpPrice");
  const watchConsumerType = formContext.watch(
    "productPriceList.[0].consumerType",
  );
  const watchSellType = formContext.watch("productPriceList.[0].sellType");

  const memoizedCountries = useMemo(() => {
    return (
      countriesQuery?.data?.data.map((item: ICountries) => {
        return { label: item.countryName, value: item.id };
      }) || []
    );
  }, [countriesQuery?.data?.data?.length]);

  const memoizedLocations = useMemo(() => {
    return (
      locationsQuery?.data?.data.map((item: ILocations) => {
        return { label: item.locationName, value: item.id };
      }) || []
    );
  }, [locationsQuery?.data?.data?.length]);

  const consumerTypeMessage =
    Array.isArray(formContext.formState.errors?.productPriceList) &&
    formContext.formState.errors.productPriceList.length > 0
      ? formContext.formState.errors.productPriceList[0]?.consumerType?.message
      : undefined;

  const sellTypeMessage =
    Array.isArray(formContext.formState.errors?.productPriceList) &&
    formContext.formState.errors.productPriceList.length > 0
      ? formContext.formState.errors.productPriceList[0]?.sellType?.message
      : undefined;

  const deliveryAfterMessage =
    Array.isArray(formContext.formState.errors?.productPriceList) &&
    formContext.formState.errors.productPriceList.length > 0
      ? formContext.formState.errors.productPriceList[0]?.deliveryAfter?.message
      : undefined;

  return (
    <div className="form-groups-common-sec-s1">
      <h3>Price</h3>
      <div className="mb-4 w-full space-y-2">
        <div className="text-with-checkagree">
          <FormField
            control={formContext.control}
            name="setUpPrice"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border border-solid border-gray-300 data-[state=checked]:!bg-dark-orange"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Set up price</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>

      {watchSetUpPrice ? (
        <>
          <div className="mb-4 grid w-full grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
            <div className="mt-2 flex flex-col gap-y-3">
              <Label>Consumer Type</Label>
              <Controller
                name="productPriceList.[0].consumerType"
                control={formContext.control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    onChange={(newValue) => {
                      field.onChange(newValue?.value);
                    }}
                    options={CONSUMER_TYPE_LIST}
                    value={CONSUMER_TYPE_LIST.find(
                      (item: Option) => item.value === field.value,
                    )}
                    styles={customStyles}
                    instanceId="productPriceList.[0].consumerType"
                  />
                )}
              />

              {consumerTypeMessage ? (
                <p className="text-[13px] text-red-500">
                  {consumerTypeMessage}
                </p>
              ) : null}
            </div>

            <div className="mt-2 flex flex-col gap-y-3">
              <Label>Sell Type</Label>
              <Controller
                name="productPriceList.[0].sellType"
                control={formContext.control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    onChange={(newValue) => {
                      field.onChange(newValue?.value);
                    }}
                    options={SELL_TYPE_LIST}
                    value={SELL_TYPE_LIST.find(
                      (item: Option) => item.value === field.value,
                    )}
                    styles={customStyles}
                    instanceId="productPriceList.[0].sellType"
                  />
                )}
              />

              {sellTypeMessage ? (
                <p className="text-[13px] text-red-500">{sellTypeMessage}</p>
              ) : null}
            </div>
          </div>

          <div className="mb-4 grid w-full grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-4">
            <div className="col-span-2 grid w-full grid-cols-2 gap-x-5 gap-y-4">
              {watchConsumerType === "EVERYONE" ||
              watchConsumerType === "CONSUMER" ? (
                <CounterTextInputField
                  label="Consumer Discount"
                  name="productPriceList.[0].consumerDiscount"
                  placeholder="Discount"
                />
              ) : null}

              {watchConsumerType === "EVERYONE" ||
              watchConsumerType === "VENDORS" ? (
                <CounterTextInputField
                  label="Vendor Discount"
                  name="productPriceList.[0].vendorDiscount"
                  placeholder="Discount"
                />
              ) : null}
            </div>

            {watchSellType === "BUYGROUP" ? (
              <>
                <CounterTextInputField
                  label="Min Customer"
                  name="productPriceList.[0].minCustomer"
                  placeholder="Min"
                />

                <CounterTextInputField
                  label="Max Customer"
                  name="productPriceList.[0].maxCustomer"
                  placeholder="Max"
                />
              </>
            ) : null}

            {watchSellType === "BUYGROUP" ? (
              <>
                <CounterTextInputField
                  label="Min Quantity"
                  name="productPriceList.[0].minQuantity"
                  placeholder="Min"
                />

                <CounterTextInputField
                  label="Max Quantity"
                  name="productPriceList.[0].maxQuantity"
                  placeholder="Max"
                />
              </>
            ) : null}

            {watchSellType === "NORMALSELL" || watchSellType === "BUYGROUP" ? (
              <>
                <CounterTextInputField
                  label="Min Quantity Per Customer"
                  name="productPriceList.[0].minQuantityPerCustomer"
                  placeholder="Min"
                />

                <CounterTextInputField
                  label="Max Quantity Per Customer"
                  name="productPriceList.[0].maxQuantityPerCustomer"
                  placeholder="Max"
                />
              </>
            ) : null}

            {watchSellType === "BUYGROUP" ? (
              <>
                <CounterTextInputField
                  label="Time Open"
                  name="productPriceList.[0].timeOpen"
                  placeholder="Open"
                />

                <CounterTextInputField
                  label="Time Close"
                  name="productPriceList.[0].timeClose"
                  placeholder="Close"
                />
              </>
            ) : null}
          </div>

          <div className="mb-4 grid w-full grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
            <div className="mt-2 flex flex-col gap-y-3">
              <Label>Deliver After</Label>
              <Controller
                name="productPriceList.[0].deliveryAfter"
                control={formContext.control}
                render={({ field }) => (
                  <ReactSelect
                    {...field}
                    onChange={(newValue) => {
                      field.onChange(newValue?.value);
                    }}
                    options={DELIVER_AFTER_LIST}
                    value={DELIVER_AFTER_LIST.find(
                      (item: any) => item.value === field.value,
                    )}
                    styles={customStyles}
                    instanceId="productPriceList.[0].deliveryAfter"
                  />
                )}
              />

              {deliveryAfterMessage ? (
                <p className="text-[13px] text-red-500">
                  {deliveryAfterMessage}
                </p>
              ) : null}
            </div>
          </div>

          {activeProductType !== "R" ? (
            <div className="mb-4 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
              <FormField
                control={formContext.control}
                name="productPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]">
                          $
                        </div>
                        <Input
                          type="number"
                          onWheel={(e) => e.currentTarget.blur()}
                          placeholder="Product Price"
                          className="!h-[48px] rounded border-gray-300 pl-12 pr-10 focus-visible:!ring-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={formContext.control}
                name="offerPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offer Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-2 top-[6px] flex h-[34px] w-[32px] items-center justify-center !bg-[#F6F6F6]">
                          $
                        </div>
                        <Input
                          type="number"
                          onWheel={(e) => e.currentTarget.blur()}
                          placeholder="Offer Price"
                          className="!h-[48px] rounded border-gray-300 pl-12 pr-10 focus-visible:!ring-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
            </div>
          ) : null}
        </>
      ) : null}

      <div className="mb-3 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
        {activeProductType !== "R" ? (
          <div className="mt-2 flex flex-col gap-y-3">
            <Label>Product Location</Label>
            <Controller
              name="productLocationId"
              control={formContext.control}
              render={({ field }) => (
                <ReactSelect
                  {...field}
                  onChange={(newValue) => {
                    field.onChange(newValue?.value);
                  }}
                  options={memoizedLocations}
                  value={memoizedLocations.find(
                    (item: IOption) => item.value === field.value,
                  )}
                  styles={customStyles}
                  instanceId="productLocationId"
                />
              )}
            />

            <p className="text-[13px] text-red-500">
              {
                formContext.formState.errors["productLocationId"]
                  ?.message as string
              }
            </p>
          </div>
        ) : null}

        <div className="mt-2 flex flex-col gap-y-3">
          <Label>Place of Origin</Label>
          <Controller
            name="placeOfOriginId"
            control={formContext.control}
            render={({ field }) => (
              <ReactSelect
                {...field}
                onChange={(newValue) => {
                  field.onChange(newValue?.value);
                }}
                options={memoizedCountries}
                value={memoizedCountries.find(
                  (item: IOption) => item.value === field.value,
                )}
                styles={customStyles}
                instanceId="placeOfOriginId"
              />
            )}
          />

          <p className="text-[13px] text-red-500">
            {formContext.formState.errors["placeOfOriginId"]?.message as string}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceSection;
