import React, { useMemo } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Controller, useFormContext, useWatch } from "react-hook-form";
import ReactSelect from "react-select";
import { Label } from "@/components/ui/label";
import CounterTextInputField from "./CounterTextInputField";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CONSUMER_TYPE_LIST, SELL_TYPE_LIST } from "@/utils/constants";
import { ICountries, ILocations, IOption } from "@/utils/types/common.types";
import { useCountries, useLocation } from "@/apis/queries/masters.queries";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import ControlledDatePicker from "@/components/shared/Forms/ControlledDatePicker";
import ControlledTimePicker from "@/components/shared/Forms/ControlledTimePicker";

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
  const watchIsOfferPriceRequired = formContext.watch("isOfferPriceRequired");
  const watchIsStockRequired = formContext.watch("isStockRequired");

  const watchDateOpen = formContext.watch("productPriceList.[0].dateOpen"); // Watch the Time Open value

//   const watchStartTime = formContext.watch("productPriceList.[0].startTime");
// const watchEndTime = formContext.watch("productPriceList.[0].endTime");



// console.log("Start Time:", watchStartTime); // ✅ This should update dynamically

// console.log("Form Values price:", formContext.getValues());


  const watchConsumerType = formContext.watch(
    "productPriceList.[0].consumerType",
  );
  const watchSellType = formContext.watch("productPriceList.[0].sellType");
  // TODO: validation remove when user types
  // const watchMinCustomer = formContext.watch(
  //   "productPriceList.[0].minCustomer",
  // );
  // const watchMaxCustomer = formContext.watch(
  //   "productPriceList.[0].maxCustomer",
  // );
  // const watchMinQuantityPerCustomer = formContext.watch(
  //   "productPriceList.[0].minQuantityPerCustomer",
  // );
  // const watchMaxQuantityPerCustomer = formContext.watch(
  //   "productPriceList.[0].maxQuantityPerCustomer",
  // );
  // const watchMinQuantity = formContext.watch(
  //   "productPriceList.[0].minQuantity",
  // );
  // const watchMaxQuantity = formContext.watch(
  //   "productPriceList.[0].maxQuantity",
  // );
  // const watchTimeOpen = formContext.watch("productPriceList.[0].timeOpen");
  // const watchTimeClose = formContext.watch("productPriceList.[0].timeClose");
  // const watchDeliveryAfter = formContext.watch(
  //   "productPriceList.[0].deliveryAfter",
  // );

  const memoizedCountries = useMemo(() => {
    return (
      countriesQuery?.data?.data.map((item: ICountries) => {
        return { label: item.countryName, value: item.id };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countriesQuery?.data?.data?.length]);

  const memoizedLocations = useMemo(() => {
    return (
      locationsQuery?.data?.data.map((item: ILocations) => {
        return { label: item.locationName, value: item.id };
      }) || []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationsQuery?.data?.data?.length]);

  const errors = formContext.formState.errors;

  const consumerTypeMessage =
    errors && typeof errors["0"] === "object" && "consumerType" in errors["0"]
      ? errors["0"].consumerType?.message
      : undefined;

  const sellTypeMessage =
    errors && typeof errors["0"] === "object" && "sellType" in errors["0"]
      ? errors["0"].sellType?.message
      : undefined;

  const minCustomerMessage =
    errors && typeof errors["0"] === "object" && "minCustomer" in errors["0"]
      ? errors["0"].minCustomer?.message
      : undefined;

  const maxCustomerMessage =
    errors && typeof errors["0"] === "object" && "maxCustomer" in errors["0"]
      ? errors["0"].maxCustomer?.message
      : undefined;

  const minQuantityPerCustomerMessage =
    errors &&
      typeof errors["0"] === "object" &&
      "minQuantityPerCustomer" in errors["0"]
      ? errors["0"].minQuantityPerCustomer?.message
      : undefined;

  const maxQuantityPerCustomerMessage =
    errors &&
      typeof errors["0"] === "object" &&
      "maxQuantityPerCustomer" in errors["0"]
      ? errors["0"].maxQuantityPerCustomer?.message
      : undefined;

  const minQuantityMessage =
    errors && typeof errors["0"] === "object" && "minQuantity" in errors["0"]
      ? errors["0"].minQuantity?.message
      : undefined;

  const maxQuantityMessage =
    errors && typeof errors["0"] === "object" && "maxQuantity" in errors["0"]
      ? errors["0"].maxQuantity?.message
      : undefined;

  const timeOpenMessage =
    errors && typeof errors["0"] === "object" && "timeOpen" in errors["0"]
      ? errors["0"].timeOpen?.message
      : undefined;

  const timeCloseMessage =
    errors && typeof errors["0"] === "object" && "timeClose" in errors["0"]
      ? errors["0"].timeClose?.message
      : undefined;

  const deliveryAfterMessage =
    errors && typeof errors["0"] === "object" && "deliveryAfter" in errors["0"]
      ? errors["0"].deliveryAfter?.message
      : undefined;

  return (
    <div className="form-groups-common-sec-s1">
      <h3 className={cn(activeProductType === "R" ? "!mb-0" : "")}>Price</h3>
      {activeProductType !== "R" ? (
        <div className="mb-4 flex w-full flex-row items-center gap-x-5">
          <div className="text-with-checkagree">
            <FormField
              control={formContext.control}
              name="setUpPrice"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border bg-white p-4">
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
      ) : null}

      {watchSetUpPrice ? (
        <>
          {activeProductType !== "R" ? (
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
                {!watchConsumerType && consumerTypeMessage ? (
                  <p className="text-[13px] text-red-500">
                    {consumerTypeMessage.toString()}
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

                {!watchSellType && sellTypeMessage ? (
                  <p className="text-[13px] text-red-500">
                    {sellTypeMessage.toString()}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

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
                  errorMessage={
                    minCustomerMessage
                      ? minCustomerMessage.toString()
                      : undefined
                  }
                />

                <CounterTextInputField
                  label="Max Customer"
                  name="productPriceList.[0].maxCustomer"
                  placeholder="Max"
                  errorMessage={
                    maxCustomerMessage
                      ? maxCustomerMessage.toString()
                      : undefined
                  }
                />
              </>
            ) : null}

            {watchSellType === "BUYGROUP" ? (
              <>
                <CounterTextInputField
                  label="Min Quantity"
                  name="productPriceList.[0].minQuantity"
                  placeholder="Min"
                  errorMessage={
                    minQuantityMessage
                      ? minQuantityMessage.toString()
                      : undefined
                  }
                />

                <CounterTextInputField
                  label="Max Quantity"
                  name="productPriceList.[0].maxQuantity"
                  placeholder="Max"
                  errorMessage={
                    maxQuantityMessage
                      ? maxQuantityMessage.toString()
                      : undefined
                  }
                />
              </>
            ) : null}

            {watchSellType === "NORMALSELL" || watchSellType === "BUYGROUP" ? (
              <>
                <CounterTextInputField
                  label="Min Quantity Per Customer"
                  name="productPriceList.[0].minQuantityPerCustomer"
                  placeholder="Min"
                  errorMessage={
                    minQuantityPerCustomerMessage
                      ? minQuantityPerCustomerMessage.toString()
                      : undefined
                  }
                />

                <CounterTextInputField
                  label="Max Quantity Per Customer"
                  name="productPriceList.[0].maxQuantityPerCustomer"
                  placeholder="Max"
                  errorMessage={
                    maxQuantityPerCustomerMessage
                      ? maxQuantityPerCustomerMessage.toString()
                      : undefined
                  }
                />
              </>
            ) : null}

            {watchSellType === "BUYGROUP" ? (
              <>
                {/* <CounterTextInputField
                  label="Time Open"
                  name="productPriceList.[0].timeOpen"
                  placeholder="Open"
                  errorMessage={
                    timeOpenMessage ? timeOpenMessage.toString() : undefined
                  }
                /> */}

                <ControlledDatePicker
                label="Date Open"
                name="productPriceList.[0].dateOpen"
                isFuture />

                <ControlledTimePicker
                  label="Time Open"
                  name="productPriceList.[0].startTime"
                />

                <ControlledDatePicker
                label="Date Close"
                name="productPriceList.[0].dateClose"
                isFuture
                minDate={watchDateOpen} // Pass timeOpen as minDate to disable past dates
                 />

                <ControlledTimePicker
                  label="Time Close"
                  name="productPriceList.[0].endTime"
                />

                {/* <CounterTextInputField
                  label="Time Close"
                  name="productPriceList.[0].timeClose"
                  placeholder="Close"
                  errorMessage={
                    timeCloseMessage ? timeCloseMessage.toString() : undefined
                  }
                /> */}
              </>
            ) : null}
          </div>

          {activeProductType !== "R" ? (
            <div className="mb-4 grid w-full grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
              <CounterTextInputField
                label="Deliver After"
                name="productPriceList.[0].deliveryAfter"
                placeholder="After"
                errorMessage={
                  deliveryAfterMessage
                    ? deliveryAfterMessage.toString()
                    : undefined
                }
              />
            </div>
          ) : null}

          {activeProductType !== "R" && watchSetUpPrice ? (
            <div className="mb-4 flex w-full flex-row items-center gap-x-5">
              <>
                <div className="flex flex-row items-center gap-x-3">
                  <Controller
                    name="isCustomProduct"
                    control={formContext.control}
                    render={({ field }) => (
                      <Switch checked={!!field.value} onCheckedChange={field.onChange} className="data-[state=checked]:!bg-dark-orange" />
                    )}
                  />
                  <Label>Customize Product</Label>
                </div>

                <div className="flex flex-row items-center gap-x-3">
                  <Controller
                    name="isOfferPriceRequired"
                    control={formContext.control}
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:!bg-dark-orange"
                      />
                    )}
                  />
                  <Label>Ask for the Price</Label>
                </div>

                <div className="flex flex-row items-center gap-x-3">
                  <Controller
                    name="isStockRequired"
                    control={formContext.control}
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:!bg-dark-orange"
                      />
                    )}
                  />
                  <Label>Ask for the Stock</Label>
                </div>
              </>
            </div>
          ) : null}

          <div className="mb-4 grid w-full grid-cols-1 gap-x-5 md:grid-cols-2">
            {activeProductType !== "R" && !watchIsOfferPriceRequired ? (
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
                          disabled={watchIsOfferPriceRequired}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
            {activeProductType === "R" && !watchIsOfferPriceRequired ? (
              <FormField
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
                          disabled={watchIsOfferPriceRequired}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}

            {activeProductType !== "R" && !watchIsStockRequired ? (
              <FormField
                control={formContext.control}
                name="productPriceList.[0].stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        onWheel={(e) => e.currentTarget.blur()}
                        placeholder="Stock"
                        className="!h-[48px] rounded border-gray-300 focus-visible:!ring-0"
                        disabled={watchIsStockRequired}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : null}
          </div>
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
